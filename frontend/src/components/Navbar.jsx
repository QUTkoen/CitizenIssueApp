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
    <nav className="bg-green-700 text-yellow-300 p-4 flex justify-between items-center shadow-md">
      {/* App title */}
      <Link to="/" className="text-2xl font-bold hover:text-yellow-500 transition-colors duration-300">
        Citizen Issue Application
      </Link>

      <div className="flex items-center">
        {user ? (
          <>
            <Link to="/tasks" className="mr-6 hover:text-yellow-400 transition-colors duration-300">
              Reports
            </Link>
            <Link to="/profile" className="mr-6 hover:text-yellow-400 transition-colors duration-300">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-yellow-400 text-green-900 px-5 py-2 rounded hover:bg-yellow-500 transition-colors duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-6 hover:text-yellow-400 transition-colors duration-300">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
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
