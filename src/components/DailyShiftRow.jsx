import React from 'react';

/**
 * Component for a single daily shift row
 * @param {Object} shift - The shift object with day, isWorked, startTime, endTime, isPublicHoliday
 * @param {number} index - Index of this shift in the shifts array
 * @param {Function} onShiftChange - Handler for shift changes
 * @returns {JSX.Element} Rendered shift row
 */
const DailyShiftRow = ({ shift, index, onShiftChange }) => {
  const handleChange = (field, value) => {
    onShiftChange(index, field, value);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 items-center p-3 bg-gray-50 rounded-lg">
      <label className="font-medium text-gray-700 sm:col-span-1">{shift.day}</label>

      <div className="flex items-center space-x-2 sm:col-span-1">
        <input
          type="checkbox"
          id={`worked-${shift.day}`}
          checked={shift.isWorked}
          onChange={e => handleChange('isWorked', e.target.checked)}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor={`worked-${shift.day}`} className="text-sm text-gray-600">
          Worked?
        </label>
      </div>

      <div className="sm:col-span-1">
        <label htmlFor={`start-${shift.day}`} className="text-xs text-gray-500 block mb-1">
          Start
        </label>
        <input
          type="time"
          id={`start-${shift.day}`}
          value={shift.startTime}
          onChange={e => handleChange('startTime', e.target.value)}
          disabled={!shift.isWorked}
          className={`w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
            !shift.isWorked ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
        />
      </div>

      <div className="sm:col-span-1">
        <label htmlFor={`end-${shift.day}`} className="text-xs text-gray-500 block mb-1">
          End
        </label>
        <input
          type="time"
          id={`end-${shift.day}`}
          value={shift.endTime}
          onChange={e => handleChange('endTime', e.target.value)}
          disabled={!shift.isWorked}
          className={`w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
            !shift.isWorked ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
        />
      </div>

      <div className="flex items-center space-x-2 sm:col-span-2">
        <input
          type="checkbox"
          id={`ph-${shift.day}`}
          checked={shift.isPublicHoliday}
          onChange={e => handleChange('isPublicHoliday', e.target.checked)}
          disabled={!shift.isWorked}
          className={`h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500 ${
            !shift.isWorked ? 'cursor-not-allowed opacity-50' : ''
          }`}
        />
        <label
          htmlFor={`ph-${shift.day}`}
          className={`text-sm ${shift.isWorked ? 'text-red-600' : 'text-gray-400'}`}
        >
          Public Holiday?
        </label>
      </div>
    </div>
  );
};

export default DailyShiftRow;
