import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './AuthPages.css'

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
        setIsLoading(false);

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        setIsLoading(true);

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
        <div className='auth-container'>
            <div className='auth-card'>
                <div className="auth-header">
                    <h1>Create Account</h1>
                    <p>Start tracking your fitness journey</p>
                </div>

                <form onSubmit={handleSubmit} className='auth-form'>
                    {error && (
                        <div className='error-message'>
                            <span className='error-icon'>⚠️</span>
                            {error}
                        </div>
                    )}

                    <div className='form-group'>
                        <label htmlFor='username'>Username</label>
                        <input
                            id='username'
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength={3}
                            placeholder='johndoe'
                            autoComplete='username'
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            id='email'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder='you@example.com'
                            autoComplete='email'
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            id='password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            placeholder='........'
                            autoComplete='new-password'
                        />
                        <small className='form-hint'>At least 6 characters</small>
                    </div>
                    <button
                        type='submit'
                        disabled={isLoading}
                        className='auth-button'
                    >
                        {isLoading ? (
                            <span className='loading-spinner'>Creating account...</span>
                        ) : (
                            'Sign Up'
                        )}
                        </button>
                </form>

                <div className='auth-footer'>
                    <p>
                        Already have an account?
                        <Link to='/Login' className='auth-link'>Log in </Link>

                    </p>
                </div>
            </div>
        </div>
    );

}

export default SignupPage;