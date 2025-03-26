import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../../lib/firebase/firebase";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const logout = async () => {
      setError(null);
      try {
        await signOut(auth);
        setSuccess('Logout successful')
        navigate('/login')
      } catch (err: any) {
        setError(err.message);
      }
    };
    logout();
  }, [navigate]);

  return (
    <div>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default Logout;