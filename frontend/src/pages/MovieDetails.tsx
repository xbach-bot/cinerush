import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { slug } = useParams();
  
  return (
    <div style={{ minHeight: '60vh', padding: '20px' }}>
      <h1>Chi Tiết Phim: {slug}</h1>
    </div>
  );
};

export default MovieDetails;
