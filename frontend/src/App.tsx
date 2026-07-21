import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerLayout from './layouts/CustomerLayout';
import AdminLayout from './layouts/admin/AdminLayout';
import StaffLayout from './layouts/StaffLayout';

// Customer Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import ShowtimeSeats from './pages/ShowtimeSeats';
import Checkout from './pages/Checkout';
import MyBookings from './pages/MyBookings';
import MyTickets from './pages/MyTickets';
import Profile from './pages/Profile';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import AdminMovies from './pages/admin/AdminMovies';
import AdminGenres from './pages/admin/AdminGenres';
import AdminCinemas from './pages/admin/AdminCinemas';
import AdminShowtimes from './pages/admin/AdminShowtimes';
import AdminUsers from './pages/admin/AdminUsers';
import AdminBookings from './pages/admin/AdminBookings';

// Staff Pages
import TicketCheck from './pages/staff/TicketCheck';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:slug" element={<MovieDetails />} />
          <Route path="showtimes/:id/seats" element={<ShowtimeSeats />} />
          <Route path="checkout/:code" element={<Checkout />} />
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="my-tickets" element={<MyTickets />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="movies" element={<AdminMovies />} />
          <Route path="genres" element={<AdminGenres />} />
          <Route path="cinemas" element={<AdminCinemas />} />
          <Route path="showtimes" element={<AdminShowtimes />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="bookings" element={<AdminBookings />} />
        </Route>

        {/* Staff Routes */}
        <Route path="/staff" element={<StaffLayout />}>
          <Route path="ticket-check" element={<TicketCheck />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

