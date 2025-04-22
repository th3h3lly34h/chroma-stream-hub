import { AuthResponse, ApiError, Category, LiveStream, VodStream, VodInfo, SeriesInfo } from '@/types/api';

export class ApiService {
  private static instance: ApiService;
  private authData: AuthResponse | null = null;
  private baseUrl: string = ''; // Will be set during authentication

  private constructor() {}

  static getInstance(): ApiService {
    if (!this.instance) {
      this.instance = new ApiService();
    }
    return this.instance;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  async authenticate(host: string, username: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${host}/player_api.php?username=${username}&password=${password}`);
      const data: AuthResponse = await response.json();
      
      if (!data.user_info) {
        return { success: false, error: 'Invalid response from server' };
      }

      // Validate authentication
      if (data.user_info.auth !== 1) {
        return { success: false, error: 'Invalid credentials' };
      }

      // Check if subscription is active
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const expDate = parseInt(data.user_info.exp_date);
      
      if (expDate < currentTimestamp) {
        return { success: false, error: 'Subscription expired' };
      }

      // Store auth data and base URL
      this.authData = data;
      this.baseUrl = host;

      // Check if subscription will expire soon
      const sevenDays = 7 * 24 * 60 * 60; // 7 days in seconds
      if (expDate < currentTimestamp + sevenDays) {
        return { 
          success: true, 
          error: 'Your subscription will expire soon. Please contact your provider to renew.'
        };
      }

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to authenticate' 
      };
    }
  }

  private async makeRequest<T>(action: string, params: Record<string, string> = {}): Promise<T> {
    if (!this.authData) {
      throw new Error('Not authenticated');
    }

    const { user_info } = this.authData;
    const queryParams = new URLSearchParams({
      username: user_info.username,
      password: user_info.password,
      action,
      ...params
    });

    const response = await fetch(`${this.baseUrl}/player_api.php?${queryParams}`);
    
    if (!response.ok) {
      throw new Error('API request failed');
    }

    return response.json();
  }

  // Content fetching methods
  async getLiveCategories(): Promise<Category[]> {
    return this.makeRequest<Category[]>('get_live_categories');
  }

  async getVodCategories(): Promise<Category[]> {
    return this.makeRequest<Category[]>('get_vod_categories');
  }

  async getSeriesCategories(): Promise<Category[]> {
    return this.makeRequest<Category[]>('get_series_categories');
  }

  async getLiveStreams(categoryId: string): Promise<LiveStream[]> {
    return this.makeRequest<LiveStream[]>('get_live_streams', { category_id: categoryId });
  }

  async getVodStreams(categoryId: string): Promise<VodStream[]> {
    return this.makeRequest<VodStream[]>('get_vod_streams', { category_id: categoryId });
  }

  async getVodInfo(vodId: string): Promise<VodInfo> {
    return this.makeRequest<VodInfo>('get_vod_info', { vod_id: vodId });
  }

  async getSeriesInfo(seriesId: string): Promise<SeriesInfo> {
    return this.makeRequest<SeriesInfo>('get_series_info', { series_id: seriesId });
  }

  isAuthenticated(): boolean {
    return this.authData !== null;
  }

  getAuthData(): AuthResponse | null {
    return this.authData;
  }

  clearAuth(): void {
    this.authData = null;
  }
}

export const apiService = ApiService.getInstance();
