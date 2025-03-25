import { useState, useEffect } from "react";
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../../lib/firebase/firebase";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState('');

    const { user } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/profile')
        }
    }, [user, navigate]);
    
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        try {
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            setSuccess("Login successful!");
            navigate('/');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
    <>
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                
                <input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    </>
  );
};

export default Login;