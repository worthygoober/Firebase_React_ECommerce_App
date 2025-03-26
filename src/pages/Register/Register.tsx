import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../lib/firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/types";
import '../../styles/auth-styles.css'

const Register = () => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            
            const userData: User = {
                displayName,
                email,
                address,
                createdAt: serverTimestamp(),
                uid: userCredential.user.uid
            };

            await addDoc(collection(db, 'users'), userData);

            await updateProfile(userCredential.user, {
                displayName: displayName,
            });

            setSuccess('Registration successful!');
            navigate('/profile');
        } catch (err: any) {
            setError(err.message);
            console.error('Registration error:', err);
        }
    };
  
    return (
    <>
        <div className="form">
            <h1>Create an Account</h1>

            <form onSubmit={handleRegister}>
                <fieldset className="fieldset">
                <legend className="legend">Register</legend>

                    <label htmlFor="name">Display Name</label>
                    <input className="input" 
                    type="text"
                    placeholder="Your name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                    />
                

                    <label htmlFor="email">Email</label>
                    <input className="input" 
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />

                    <label htmlFor="password">Password</label>
                    <input className="input" 
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />

                    <label htmlFor="address">Shipping Address</label>
                    <input className="input" 
                    type="text"
                    placeholder="Your shipping address (optional)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    />
                </fieldset>

                <button type="submit" className="button">Register</button>
                
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
            </form>
        </div>
    </>
  );
};

export default Register;