import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';
import { getSpotifyAuthUrl } from '../auth/spotifyAuth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('access_token');
      if (token) {
        localStorage.setItem('spotify_token', token);
        navigate('/dashboard');
      }
    }
  }, [navigate]);

  const handleLogin = () => {
    setIsLoading(true);
    try {
      window.location.href = getSpotifyAuthUrl();
    } catch (error) {
      setIsLoading(false);
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-[#121212] p-10 rounded-2xl shadow-2xl border border-[#282828]">
        <div className="text-center">
          <div className="flex justify-center mb-6">
          <SocialIcon network="spotify" style={{ height: 100, width: 100 }} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Spotify Insights
          </h1>
          <p className="text-gray-400 mb-8">
            Discover your listening patterns and top tracks
          </p>
        </div>
        
        <button 
          onClick={handleLogin}
          disabled={isLoading}
          className={`
            w-full py-3 rounded-full text-black font-bold 
            transition duration-300 ease-in-out
            ${isLoading 
              ? 'bg-gray-500 cursor-not-allowed' 
              : 'bg-[#1DB954] hover:bg-[#1ed760] active:bg-[#169c46]'}
            flex items-center justify-center space-x-2
          `}
        >
          {isLoading ? (
            <div className="flex items-center">
              <svg 
                className="animate-spin h-5 w-5 mr-3 text-white" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                ></circle>
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Connecting...
            </div>
          ) : (
            <>
              <SocialIcon network="spotify" className="w-6 h-6" />
              <span>Login with Spotify</span>
            </>
          )}
        </button>
        
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Securely connected via Spotify OAuth
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;