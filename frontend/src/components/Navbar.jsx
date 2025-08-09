import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-green-700 text-yellow-300 p-4 flex justify-between items-center">
      {/* Renamed the app title */}
      <Link to="/" className="text-2xl font-bold hover:text-yellow-500">Citizen Issue Application</Link>

      <div>
        {user ? (
          <>
            {/* Renamed Tasks to Reports*/}
            <Link to="/tasks" className="mr-4 hover:text-yellow-400">Reports</Link>
            <Link to="/profile" className="mr-4 hover:text-yellow-400">Profile</Link>
            <button
              onClick={handleLogout}
              className="bg-yellow-400 text-green-900 px-4 py-2 rounded hover:bg-yellow-500"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4 hover:text-yellow-400">Login</Link>
            <Link
              to="/register"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
