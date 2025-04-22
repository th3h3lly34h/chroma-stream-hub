
export interface AuthResponse {
  user_info: {
    username: string;
    password: string;
    message: string;
    auth: number;
    exp_date: string;
    is_trial: string;
    active_cons: string;
    created_at: string;
    max_connections: string;
    allowed_output_formats: string[];
    status: string;
  };
  server_info: {
    url: string;
    port: string;
    https_port: string;
    server_protocol: string;
    rtmp_port: string;
    timezone: string;
    timestamp_now: number;
    time_now: string;
  };
}

export interface ApiError {
  error: string;
  error_code?: number;
}
