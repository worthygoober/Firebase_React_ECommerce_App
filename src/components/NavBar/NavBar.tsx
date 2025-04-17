import { Link, useNavigate } from "react-router-dom";
import './NavBar.css';
import { useAuth } from "../../context/AuthContext";
import { FaShoppingCart } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth} from "../../lib/firebase/firebase";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";


const NavBar = () => {
    const { user } = useAuth();

    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState('');
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const handleLogout = async () => {
      setError(null);
      try {
        await signOut(auth);
        setSuccess('Logout successful');
        navigate('/login');
        setTimeout(() => setSuccess(''), 3000);
      } catch (err: any) {
        setError(err.message);
      }
    };

  return (
    <>
    <nav className="nav-container">
        <div className="link">
          <Link to='/' className="link">Home</Link>
          
          {user ? (
              <>
              <Link to='/profile' className="link">Profile</Link>
              <button onClick={handleLogout} className="nav-button" >
                Logout
              </button>
              </>
          ) : (
              <>
              <Link to='/login' className="link">Login</Link>
              <Link to='/register' className="link">Register</Link>
              </>
          )}
        </div>

        <div className="nav-messages">
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </div>
        <Link to='/cart' className="link">
          <FaShoppingCart className="cart-icon"/>
          {user && <span className="cart-count">{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>}
        </Link>
        
    </nav>
    </>
  );
};

export default NavBar;