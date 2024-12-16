import axios from 'axios';

const spotifyApi = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
});

export const useSpotifyApi = (token: string) => {
  spotifyApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const getUserTopItems = async (type: 'tracks' | 'artists', timeRange: string) => {
    const response = await spotifyApi.get(`/me/top/${type}?time_range=${timeRange}&limit=25`);
    return response.data.items;
  };
  

  return { getUserTopItems };
};