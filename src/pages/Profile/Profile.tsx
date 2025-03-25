import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateProfile, deleteUser } from "firebase/auth";

const Profile = () => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState<string | null>(null);

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
      setSuccess('Profile updated successfully')
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try{
      if (!user) {
        setError('User not found');
        return;
      }
      await deleteUser(user);
      setSuccess('Account deleted successfully')
    } catch (error: any) {
      setError(error.message)
    }
  };

  return (
    <div>
      <h1>Profile</h1>

      <form onSubmit={handleUpdateProfile}>
        <input 
        type="text"
        value={displayName}
        placeholder="Name"
        onChange={(e) => setDisplayName(e.target.value)}
        />
        <input 
        type="email"
        value={email}
        placeholder="Email"
        disabled={true}
        />
        <button type="submit">
          Update Profile
        </button>
        {success && <p>{success}</p>}
        {error && <p>{error}</p>}
      </form>
        <div>
          <button onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
    </div>
  );
};

export default Profile;