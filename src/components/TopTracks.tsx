import React, { useEffect, useState, useCallback } from 'react';
import { useSpotifyApi } from '../hooks/useSpotifyApi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type Track = {
  fullName: string;
  name: string;
  artist: string;
  albumArt: string;
  playCount: number;
};

type SpotifyTrack = {
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  popularity: number;
};

const TopTracks: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [timeRange, setTimeRange] = useState('short_term');
  const token = localStorage.getItem('spotify_token') || '';
  const { getUserTopItems } = useSpotifyApi(token);

  const fetchTracks = useCallback(() => {
    getUserTopItems('tracks', timeRange).then((items: SpotifyTrack[]) => {
      const formattedTracks = items.slice(0, 25).map((item) => {
        const fullName = item.name;
        const name = fullName.replace(/\([^)]*\)/g, '').replace(/-.*$/, '').trim();
        return {
          fullName,
          name,
          artist: item.artists[0].name,
          albumArt: item.album.images[0].url,
          playCount: item.popularity,
        };
      });
      setTracks(formattedTracks);
    });
  }, [getUserTopItems, timeRange]);

  useEffect(() => {
    fetchTracks();
  }, [fetchTracks]);

  return (
    <div className="bg-gradient-to-br from-[#333333] to-[#1f1f1f] shadow-xl rounded-2xl overflow-hidden transition-transform duration-300">
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-[#ffffff]">Top Tracks</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {['short_term', 'medium_term', 'long_term'].map((range) => (
            <button
              key={range}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                timeRange === range
                  ? 'bg-[#1bc457] text-[#000000] shadow-lg shadow-[#1bc457]/20'
                  : 'bg-[#000000] text-[#1bc457] hover:bg-[#1bc457]/10'
              }`}
              onClick={() => setTimeRange(range)}
            >
              {range === 'short_term'
                ? 'Last Month'
                : range === 'medium_term'
                ? '6 Months'
                : 'All Time'}
            </button>
          ))}
        </div>
        <div className="bg-[#000000]/50 rounded-xl p-4 mb-6">
          <ResponsiveContainer width="100%" height={700}>
            <BarChart
              data={tracks}
              margin={{ top: 50, right: 10, bottom: 130, left: 10 }} // Adjust the bottom margin
            >
              <XAxis
                dataKey="name"
                tick={{ fill: '#ffffff', fontSize: 12 }}
                interval={0}
                angle={-90}
                textAnchor="end"
              />
              <YAxis tick={{ fill: '#ffffff' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#000000',
                  border: '1px solid #1bc457',
                  borderRadius: '8px',
                  padding: '8px',
                }}
                labelStyle={{ color: '#FFFFF' }}
              />
              <Bar dataKey="playCount" fill="#1bc457" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <ul className="space-y-3">
          {tracks.map((track, index) => (
            <li
              key={index}
              className="flex items-center p-3 rounded-xl bg-[#000000]/30 hover:bg-[#000000]/50 transition-colors duration-200"
            >
              <img
                src={track.albumArt}
                alt={`${track.name} album art`}
                className="w-16 h-16 rounded-lg shadow-lg"
              />
              <div className="ml-4 flex-1">
                <h3 className="font-semibold text-[#1bc457] text-lg mb-1">
                  {track.fullName}
                </h3>
                <p className="text-sm text-gray-400">{track.artist}</p>
              </div>
              <div className="text-2xl font-bold text-[#1bc457] opacity-50">
                {index + 1}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopTracks;
