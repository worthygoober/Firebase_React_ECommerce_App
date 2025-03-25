import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/types";

const Register = () => {
    const [name, setName] = useState('');
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
                name,
                email,
                address,
                createdAt: serverTimestamp(),
                uid: userCredential.user.uid
            };

            await addDoc(collection(db, 'users'), userData);

            setSuccess('Registration successful!');
            navigate('/');
        } catch (err: any) {
            setError(err.message);
            console.error('Registration error:', err);
        }
    };
  
    return (
    <>
        <div className="register-container">
            <h2>Create an Account</h2>

            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">address</label>
                    <input 
                    type="text"
                    placeholder="Your shipping address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <button type="submit" className="register-button">Register</button>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </form>
        </div>
    </>
  );
};

export default Register;