import { useParams } from 'react-router-dom';

const ShowtimeSeats = () => {
  const { id } = useParams();

  return (
    <div style={{ minHeight: '60vh', padding: '20px' }}>
      <h1>Chọn Ghế - Suất chiếu: {id}</h1>
    </div>
  );
};

export default ShowtimeSeats;
