export type MovieStatus = 'DRAFT' | 'COMING_SOON' | 'NOW_SHOWING' | 'STOPPED' | 'ARCHIVED';

export type AgeRating = 'P' | 'K' | 'T13' | 'T16' | 'T18' | 'C';

export type MovieFormat = 'TWO_D' | 'THREE_D' | 'IMAX_2D' | 'IMAX_3D' | 'FOUR_DX' | 'SCREEN_X';

export type MovieVersionStatus = 'ACTIVE' | 'INACTIVE';

export interface Movie {
  id: number;
  title: string;
  originalTitle?: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  durationMinutes: number;
  releaseDate?: string;
  endDate?: string;
  productionYear?: number;
  ageRating?: AgeRating;
  ageRatingDescription?: string;
  posterUrl?: string;
  bannerUrl?: string;
  trailerUrl?: string;
  status: MovieStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface MovieVersion {
  id: number;
  movieId: number;
  name: string;
  format: MovieFormat;
  audioLanguageId?: string;
  subtitleLanguageId?: string;
  durationMinutes?: number;
  status: MovieVersionStatus;
  createdAt: string;
  updatedAt: string;
}
