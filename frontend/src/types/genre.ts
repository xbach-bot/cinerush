export interface Genre {
  id: number;
  name: string;
  slug: string;
  description?: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
  movieCount?: number; // Optional field for dashboard/display metrics
}
