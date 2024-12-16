import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSpotifyAuthUrl } from '../auth/spotifyAuth';

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('access_token');
      if (token) {
        localStorage.setItem('spotify_token', token);
        navigate('/dashboard'); // Redirect to dashboard
      }
    }
  }, []);

  const handleLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  return (
    <div className="login-container">
      <h1>Spotify User Insights Dashboard</h1>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default Login;
