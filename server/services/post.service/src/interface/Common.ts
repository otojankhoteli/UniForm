
export interface Page {
  skip: number,
  limit: number,
  sort: Sort,
}

export interface PageResponse {
  docs: any[],
  skip: number,
  limit: number,
  total: number,
}

interface Sort {
  by: 'date' | 'rating',
  dir: 'asc' | 'desc'
}

// export type SortBy = 'date' | 'rating';
