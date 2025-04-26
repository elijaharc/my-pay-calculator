import React from 'react';
import Card from './Card';

/**
 * Component for rate inputs and settings
 * @param {Object} rates - Current rates values
 * @param {Function} onRateChange - Handler for rate changes
 * @param {string} laundryRatePerShift - Current laundry rate
 * @param {Function} onLaundryRateChange - Handler for laundry rate changes
 * @param {string} superPercentage - Current super percentage
 * @param {Function} onSuperPercentageChange - Handler for super percentage changes
 * @returns {JSX.Element} Rendered rates card
 */
const RatesCard = ({
  rates,
  onRateChange,
  laundryRatePerShift,
  onLaundryRateChange,
  superPercentage,
  onSuperPercentageChange,
}) => {
  return (
    <Card title="Rates & Deductions">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">Hourly Rates ($)</h3>
          <div className="space-y-3">
            {Object.entries(rates).map(([key, value]) => {
              if (key === 'laundryPerShift') return null;

              let label = key.replace(/([A-Z])/g, ' $1');
              label = label.charAt(0).toUpperCase() + label.slice(1);
              if (key === 'tenPmToMidnight') label = '10pm-Midnight M-F';

              return (
                <div key={key} className="flex items-center justify-between">
                  <label htmlFor={`rate-${key}`} className="text-sm font-medium text-gray-600">
                    {label}:
                  </label>
                  <input
                    id={`rate-${key}`}
                    type="text"
                    inputMode="decimal"
                    value={value}
                    onChange={e => onRateChange(key, e.target.value)}
                    className="w-24 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right text-sm"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="laundryRatePerShift"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Laundry Rate per Shift ($)
            </label>
            <input
              id="laundryRatePerShift"
              type="text"
              inputMode="decimal"
              value={laundryRatePerShift}
              onChange={e => onLaundryRateChange(e)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="superPercentage"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Superannuation Rate (%)
            </label>
            <input
              id="superPercentage"
              type="text"
              inputMode="decimal"
              value={superPercentage}
              onChange={e => onSuperPercentageChange(e)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">Standard is 11.5% (til Jun '25)</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RatesCard;
