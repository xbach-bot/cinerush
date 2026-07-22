import type { Movie } from '../types';

export const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Avatar: Fire and Ash',
    slug: 'avatar-3',
    durationMinutes: 190,
    ageRating: 'T13',
    releaseDate: '2026-12-18',
    status: 'NOW_SHOWING',
    featured: true,
    createdAt: '2026-07-20T10:00:00Z',
    updatedAt: '2026-07-20T10:00:00Z'
  },
  {
    id: 2,
    title: 'Lật Mặt 8: Đam Mê',
    slug: 'lat-mat-8',
    durationMinutes: 125,
    ageRating: 'T16',
    releaseDate: '2026-04-30',
    status: 'NOW_SHOWING',
    featured: true,
    createdAt: '2026-07-20T10:00:00Z',
    updatedAt: '2026-07-20T10:00:00Z'
  },
  {
    id: 3,
    title: 'Detective Conan: Movie 28',
    slug: 'conan-movie-28',
    durationMinutes: 110,
    ageRating: 'P',
    releaseDate: '2026-08-15',
    status: 'COMING_SOON',
    featured: false,
    createdAt: '2026-07-20T10:00:00Z',
    updatedAt: '2026-07-20T10:00:00Z'
  },
  {
    id: 4,
    title: 'Spider-Man: Beyond the Spider-Verse',
    slug: 'spiderman-beyond',
    durationMinutes: 140,
    ageRating: 'K',
    releaseDate: '2026-10-01',
    status: 'DRAFT',
    featured: false,
    createdAt: '2026-07-20T10:00:00Z',
    updatedAt: '2026-07-20T10:00:00Z'
  }
];
