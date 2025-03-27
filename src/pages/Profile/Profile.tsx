import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateProfile, deleteUser } from "firebase/auth";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase/firebase";
import { useNavigate } from "react-router-dom";
import '../../styles/auth-styles.css';

const Profile = () => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email] = useState(user?.email || '');
  const [address, setAddress] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadUserData = async () => {
      if (!user?.uid) return;

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setDisplayName(user?.displayName || userData.displayName || '');
          setAddress(userData.address || '');
        }
      } catch (err) {
        setError('Failed to load profile data');
      }
    };
    loadUserData();
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!user) {
      setError('User not found');
      return;
    }

    try {
      await updateProfile(user, {
        displayName: displayName,
      });

      await updateDoc(doc(db, 'users', user.uid), {
        address: address,
        displayName: displayName,
        updatedAt: new Date()
      });

      setSuccess('Profile updated successfully')
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user?.uid) return;

    try{
      if (!user) {
        setError('User not found');
        return;
      }

      await deleteDoc(doc(db, 'users', user.uid));

      await deleteUser(user);

      setSuccess('Account deleted successfully');
      navigate('/register');
    } catch (error: any) {
      setError(error.message);
    }
  };
  
  void auth;

  return (
    <div className="form">
      <h1>Profile</h1>

      <h3>Welcome back, {user?.displayName}</h3>

      <form onSubmit={handleUpdateProfile}>
        <fieldset className="fieldset">
        <legend className="legend">Profile</legend>

          <input
          className="input"
          type="text"
          value={displayName}
          placeholder="Name"
          onChange={(e) => setDisplayName(e.target.value)}
          />

          <input
          className="input"
          type="text"
          value={address}
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
          />

          <input
          className="input"
          type="email"
          value={email}
          placeholder="Email"
          disabled={true}
          />

        </fieldset>
        <button type="submit" className="button">
          Update Profile
        </button>
      </form>

        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}

        <div>
          <button className="deleteButton" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
    </div>
  );
};

export default Profile;