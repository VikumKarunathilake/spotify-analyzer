import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from 'recharts';
import { Track } from '../../types/spotify';

type TrackChartProps = {
  tracks: Track[];
};

const TrackChart: React.FC<TrackChartProps> = ({ tracks }) => {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] rounded-xl p-4 mb-6">
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={tracks}>
          <XAxis
            dataKey="name"
            tick={{ fill: '#FFFFFF', fontSize: 12 }}
            interval={0}
            angle={-45}
            textAnchor="end"
          />
          <YAxis tick={{ fill: '#FFFFFF' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#000000',
              border: `1px solid #C62F52`,
              borderRadius: '8px',
              padding: '8px',
            }}
            labelStyle={{ color: '#C62F52' }}
          />
          <Bar dataKey="playCount" fill="#C62F52" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default TrackChart;