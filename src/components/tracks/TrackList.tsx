import React from 'react';
import { Clock } from 'lucide-react';
import { Track } from '../../types/spotify';

type TrackListProps = {
  tracks: Track[];
};

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
  return (
    <div className="space-y-4">
      {tracks.map((track, index) => (
        <div
          key={index}
          className="flex items-center gap-4 p-3 rounded-lg bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(198,47,82,0.1)] transition-all duration-300"
        >
          <div className="relative">
            <span className="absolute -left-4 text-[rgba(255,255,255,0.7)] font-medium">
              {index + 1}
            </span>
            <img
              src={track.albumArt}
              alt={`${track.name} album art`}
              className="w-16 h-16 rounded-md"
            />
          </div>
          <div className="flex-grow">
            <h3 className="font-semibold text-[#FFFFFF]">{track.name}</h3>
            <p className="text-[rgba(255,255,255,0.7)]">{track.artist}</p>
          </div>
          <div className="flex items-center gap-1 text-[rgba(255,255,255,0.7)]">
            <Clock className="w-4 h-4" />
            <span>{track.playCount}k plays</span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default TrackList;