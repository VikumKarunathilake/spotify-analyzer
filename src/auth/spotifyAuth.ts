export const getSpotifyAuthUrl = () => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;
  const scopes = [
    'user-top-read',
    'user-read-recently-played',
    'user-read-private',
  ];
  return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${scopes.join('%20')}`;
};
