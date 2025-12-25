import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function SignupPage(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();
            console.log('Signup response:', data);

            if(!response.ok) {
                setError(data.error || 'Signup failed');
                setIsLoading(false);
                return;
            }
            console.log('About to call signup()');
            signup(data.user, data.token);
            console.log('About to navigate');
            navigate('/');
        } catch (err) {
            console.error('Caught error:', err);
            setError('Network error. Plese try again.');
            setIsLoading(false);
        }
    };

    return (
        <div style={{ maxwidth: '400px', margin: '4rem auto', padding: '2rem' }}>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                {error && (
                    <div style={{ color: 'red', marginBottom: '1rem'}}>
                        {error}
                    </div>
                )}
                <div style={{ marginBottom: '1rem' }}>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength={3}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
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
                        minLength={6}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }}
                    >
                        {isLoading ? 'Creating account ...' : 'Sign up'}
                    </button>

                    <p style={{ textAlign: 'center' }}>
                        Already have an account? <Link to="/login">Log in</Link>
                    </p>
            </form>
        </div>
    );

}

export default SignupPage;