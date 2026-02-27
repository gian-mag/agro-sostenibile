// Wrapper generico per le risposte del backend
export interface ApiResponse<T> {
  data: T;
  timestamp: string;
  status: number;
}

// Estensione per risposte paginate
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
