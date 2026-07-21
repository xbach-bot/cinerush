import { useParams } from 'react-router-dom';

const Checkout = () => {
  const { code } = useParams();

  return (
    <div style={{ minHeight: '60vh', padding: '20px' }}>
      <h1>Thanh Toán - Mã: {code}</h1>
    </div>
  );
};

export default Checkout;
