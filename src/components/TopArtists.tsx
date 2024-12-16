import React, { useEffect, useState } from 'react';
import { useSpotifyApi } from '../hooks/useSpotifyApi';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

type Artist = {
  name: string;
  profileImage: string;
  totalListeningTime: number;
  genres: string[];
};

const COLORS = ['#1bc457', '#14a76c', '#0e7c4b', '#09522f', '#052e1a'];

const TopArtists: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const token = localStorage.getItem('spotify_token') || '';
  const { getUserTopItems } = useSpotifyApi(token);

  useEffect(() => {
    getUserTopItems('artists', 'medium_term').then((items) => {
      const formattedArtists = items.slice(0, 5).map((item: any) => ({
        name: item.name,
        profileImage: item.images[0]?.url,
        totalListeningTime: item.popularity,
        genres: item.genres,
      }));
      setArtists(formattedArtists);
    });
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#333333] to-[#1f1f1f] rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-[1.02] duration-300">
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-[#1bc457]">Top Artists</h2>
        <div className="bg-[#000000]/50 rounded-xl p-4 mb-6">
          <ResponsiveContainer width="100%" height={500}>
            <PieChart>
              <Pie
                data={artists}
                dataKey="totalListeningTime"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={180}
              >
                {artists.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    className="hover:opacity-80 transition-opacity duration-200"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#000000',
                  border: '1px solid #1bc457',
                  borderRadius: '8px',
                  padding: '8px',
                }}
              />
              <Legend
                formatter={(value) => (
                  <span className="text-white">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="space-y-4">
          {artists.map((artist, index) => (
            <li
              key={index}
              className="flex items-center p-3 rounded-xl bg-[#000000]/30 hover:bg-[#000000]/50 transition-colors duration-200"
            >
              <div className="relative">
                <img
                  src={artist.profileImage}
                  alt={`${artist.name} profile`}
                  className="w-16 h-16 rounded-full shadow-lg ring-2 ring-[#1bc457]/30"
                />
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#1bc457] text-[#000000] flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-semibold text-[#1bc457] text-lg mb-1">
                  {artist.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {artist.genres.slice(0, 3).join(' • ')}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopArtists;

