
import { AuthResponse, ApiError } from '@/types/api';

export class ApiService {
  private static instance: ApiService;
  private authData: AuthResponse | null = null;

  private constructor() {}

  static getInstance(): ApiService {
    if (!this.instance) {
      this.instance = new ApiService();
    }
    return this.instance;
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

      // Store auth data
      this.authData = data;

      // Check if subscription will expire soon
      const sevenDays = 7 * 24 * 60 * 60; // 7 days in seconds
      if (expDate < currentTimestamp + sevenDays) {
        // Return success but with a warning flag
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
