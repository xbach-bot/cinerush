import apiClient from '../api/apiClient';

export interface ApiResponse<T> {
  status: number;
  code: string;
  message: string;
  data: T;
  timestamp: string;
}

/**
 * Gọi API kiểm tra sức khỏe hệ thống backend
 */
export const getHealthCheck = async (): Promise<ApiResponse<string>> => {
  const response = await apiClient.get<ApiResponse<string>>('/api/health');
  return response.data;
};
