import { useState, useEffect } from "react";
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../../lib/firebase/firebase";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import '../../styles/auth-styles.css';


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

    if (user) {
        return null;
    };
    
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
            navigate('/profile');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
    <>
        <div className="form">
            <h1>Welcome back</h1>
            <h2>Please Login</h2>

            <form onSubmit={handleLogin}>
                <fieldset className="fieldset">
                <legend className="legend">Login</legend>
                    
                    <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    
                    <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />

                </fieldset>

                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}

                <button type="submit" className="button">Login</button>
                <Link to='/register' className="button">New Users</Link>
            </form>
        </div>
    </>
  );
};

export default Login;