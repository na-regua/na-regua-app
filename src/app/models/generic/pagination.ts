export interface PaginatedResponse<T> {
  content: T[];
  total: number;
  limit: number;
  offset: number;
  // page: number;
  // totalPages: number;
}

export interface PaginatedFilter {
  page?: number;
  limit?: number;
  offset?: number;
}
