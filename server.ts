// server.ts
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Spotify Authentication Routes
app.get('/auth/spotify', (req, res) => {
  const scope = [
    'user-read-private', 
    'user-read-email', 
    'user-top-read'
  ].join(' ');

  const authUrl = new URL('https://accounts.spotify.com/authorize');
  authUrl.searchParams.set('client_id', process.env.SPOTIFY_CLIENT_ID || '');
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('redirect_uri', process.env.SPOTIFY_REDIRECT_URI || '');
  authUrl.searchParams.set('scope', scope);
  authUrl.searchParams.set('show_dialog', 'true');

  res.json({ authUrl: authUrl.toString() });
});

// Token Exchange Endpoint
app.post('/auth/spotify/callback', async (req, res) => {
  const { code } = req.body;

  try {
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI || '',
        client_id: process.env.SPOTIFY_CLIENT_ID || '',
        client_secret: process.env.SPOTIFY_CLIENT_SECRET || ''
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    res.json({
      access_token: tokenResponse.data.access_token,
      refresh_token: tokenResponse.data.refresh_token,
      expires_in: tokenResponse.data.expires_in
    });
  } catch (error) {
    console.error('Token exchange error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Token Refresh Endpoint
app.post('/auth/spotify/refresh', async (req, res) => {
  const { refresh_token } = req.body;

  try {
    const refreshResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
        client_id: process.env.SPOTIFY_CLIENT_ID || '',
        client_secret: process.env.SPOTIFY_CLIENT_SECRET || ''
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    res.json({
      access_token: refreshResponse.data.access_token,
      expires_in: refreshResponse.data.expires_in
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({ error: 'Token refresh failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// package.json dependencies
// {
//   "dependencies": {
//     "axios": "^1.6.0",
//     "cors": "^2.8.5",
//     "dotenv": "^16.3.1",
//     "express": "^4.18.2"
//   },
//   "devDependencies": {
//     "@types/cors": "^2.8.17",
//     "@types/express": "^4.17.21",
//     "ts-node": "^10.9.2",
//     "typescript": "^5.3.2"
//   },
//   "scripts": {
//     "start": "ts-node server.ts"
//   }
// }