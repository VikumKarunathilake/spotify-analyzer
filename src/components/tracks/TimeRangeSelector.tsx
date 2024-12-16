import React from 'react';

type TimeRange = 'short_term' | 'medium_term' | 'long_term';

type TimeRangeSelectorProps = {
  selectedRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
};

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  selectedRange,
  onRangeChange,
}) => {
  return (
    <div className="flex gap-2 mb-6">
      <button
        onClick={() => onRangeChange('short_term')}
        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
          selectedRange === 'short_term'
            ? 'bg-[#C62F52] text-[#FFFFFF]'
            : 'bg-[rgba(255,255,255,0.1)] text-[#FFFFFF] hover:bg-[rgba(198,47,82,0.1)]'
        }`}
      >
        Last Month
      </button>
      <button
        onClick={() => onRangeChange('medium_term')}
        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
          selectedRange === 'medium_term'
            ? 'bg-[#C62F52] text-[#FFFFFF]'
            : 'bg-[rgba(255,255,255,0.1)] text-[#FFFFFF] hover:bg-[rgba(198,47,82,0.1)]'
        }`}
      >
        6 Months
      </button>
      <button
        onClick={() => onRangeChange('long_term')}
        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
          selectedRange === 'long_term'
            ? 'bg-[#C62F52] text-[#FFFFFF]'
            : 'bg-[rgba(255,255,255,0.1)] text-[#FFFFFF] hover:bg-[rgba(198,47,82,0.1)]'
        }`}
      >
        All Time
      </button>
    </div>
  );
};
export default TimeRangeSelector;