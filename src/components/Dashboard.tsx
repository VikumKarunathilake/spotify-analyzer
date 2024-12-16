import React from 'react';
import TopTracks from './TopTracks';
import TopArtists from './TopArtists';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#000000] text-white p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-[#1bc457] to-[#14a76c] bg-clip-text text-transparent">
          Spotify Insights
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TopTracks />
          <TopArtists />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

