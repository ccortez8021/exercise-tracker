import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password})
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Login failed');
                setIsLoading(false);
                return;
            }

            login(data.user, data.token);
            navigate('/');
        } catch (err) {
            setError('Network error. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem' }}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                {error && (
                    <div style={{ color: 'red', marginBottom: '1rem'}}>
                        {error}
                    </div>
                )}
                <div style={{ marginBottom: '1rem'}}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        />
                </div>
                
                <button
                    type='submit'
                    disabled={isLoading}
                    style={{ width: '100%', marginBottom: '1rem'}}
                    >
                        {isLoading ? 'Logging in ...' : 'Login'}
                    </button>

                    <p style={{ textAlign: 'center' }}>
                        Don't have an account? <Link to='/signup'>Sign up</Link>
                    </p>
            </form>
        </div>
    );
}

export default LoginPage;