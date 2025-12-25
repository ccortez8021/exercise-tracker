
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import {useState} from 'react';

import RetrievePage from './pages/RetrievePage';
import CreatePage from './pages/CreatePage';
import UpdatePage from './pages/UpdatePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignUpPage';

import { AuthProvider, useAuth } from './contexts/AuthContext';

import './index.css';

//Protect Route wrapper
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, token, user } = useAuth();
  
  console.log('ProtectedRoute check:', { isAuthenticated, loading, token: token ? 'exists' : 'null', user });
  
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  console.log('Authenticated, showing protected content');
  return children;
}
 //Main App Content (needs to be inside Router and AuthProvider)
 function AppContent() {
  const [exerciseToUpdate, setExerciseToUpdate] = useState();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className='app'>
      <header>
        <h1>Workout Log</h1>
        <p>Keep Track of Your Workouts</p>
        {isAuthenticated && (
          <div style={{ marginTop: '0.5rem' }}>
            <span>Welcome, {user?.username}!</span>
            <button
              onClick={logout}
              style={{ marginLeft: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
            >
              Logout
            </button>
          </div>
        )}
      </header>
      <nav className="App-nav">
        {isAuthenticated ? (
          <>
          <Link to="/">Home</Link>
          <Link to="/create">Create</Link>
          </>
        ) : (
            <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            </>
        )}
      </nav>
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <RetrievePage setExerciseToUpdate={setExerciseToUpdate} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreatePage />
                </ProtectedRoute>
            }
          />
          <Route
            path="/update"
            element={
              <ProtectedRoute>
                <UpdatePage exerciseToUpdate={exerciseToUpdate} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <footer>
        <p>&#xA9; 2025 Cortez, Cristo</p>
      </footer>
    </div>
  );
 }

//Main App component with providers
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App;