export interface ApiResponse<T> {
  data: T;
  timestamp: string;
  status: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
