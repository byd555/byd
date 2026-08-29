import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import './Admin.css';

export default function AdminLogin() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      setError(error.message);
    } else {
      navigate('/admin');
    }
  }

  return (
    <div className="admin-auth">
      <div className="admin-auth-bg" />
      <div className="admin-auth-overlay" />

      <form className="admin-auth__form" onSubmit={handleSubmit}>
        <div className="admin-auth__header">
          <span className="admin-brand">BYD</span>
          <h1>Admin Portal</h1>
          <p>Sign in to manage inventory and showroom models</p>
        </div>

        <div className="input-group">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            placeholder=" "
          />
          <label htmlFor="email">Email Address</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder=" "
          />
          <label htmlFor="password">Password</label>
        </div>

        {error && <p className="admin-auth__error">{error}</p>}

        <button type="submit" className="admin-btn-submit" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}