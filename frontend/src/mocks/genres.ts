import type { Genre } from '../types';

export const mockGenres: Genre[] = [
  { id: 1, name: 'Hành động', slug: 'hanh-dong', description: 'Phim chứa nhiều cảnh kịch tính, rượt đuổi, võ thuật.', active: true },
  { id: 2, name: 'Hoạt hình', slug: 'hoat-hinh', description: 'Phim hoạt họa gia đình, thiếu nhi và anime.', active: true },
  { id: 3, name: 'Kinh dị', slug: 'kinh-di', description: 'Phim giật gân, hồi hộp và ma quái.', active: true },
  { id: 4, name: 'Khoa học viễn tưởng', slug: 'khoa-hoc-vien-tuong', description: 'Phim công nghệ tương lai, vũ trụ và siêu nhiên.', active: true },
  { id: 5, name: 'Tình cảm', slug: 'tinh-cam', description: 'Phim tâm lý tình yêu lãng mạn.', active: false }
];
