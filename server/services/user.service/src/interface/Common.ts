
export interface Page {
  skip: number,
  limit: number,
  sort: Sort,
}

interface Sort {
  by: 'date' | 'rating',
  dir: 'asc' | 'desc'
}

// export type SortBy = 'date' | 'rating';
