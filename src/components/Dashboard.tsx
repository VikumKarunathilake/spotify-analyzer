import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import TopTracks from './TopTracks';
import TopArtists from './TopArtists';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tracks' | 'artists'>('tracks');

  const tabClasses = (tab: string) => 
    `px-4 py-2 text-sm font-medium transition-colors duration-200 ${
      activeTab === tab 
        ? 'bg-green-600 text-white' 
        : 'bg-gray-100 text-gray-700 hover:bg-green-100'
    }`;

  return (
    <div className="dashboard max-w-7xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <BarChart3 className="w-8 h-8 text-[#1bc457]" />
        <h1 className="text-3xl font-bold text-[#FFFFFF]">Spotify Insights</h1>
      </div>

      <div className="flex mb-4 rounded-lg overflow-hidden">
        <button 
          onClick={() => setActiveTab('tracks')}
          className={`${tabClasses('tracks')} rounded-l-lg`}
        >
          Top Tracks
        </button>
        <button 
          onClick={() => setActiveTab('artists')}
          className={`${tabClasses('artists')} rounded-r-lg`}
        >
          Top Artists
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'tracks' ? <TopTracks /> : <TopArtists />}
      </div>
    </div>
  );
};

export default Dashboard;