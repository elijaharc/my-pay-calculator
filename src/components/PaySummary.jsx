import React from 'react';
import Card from './Card';
import { formatHours, formatCurrency } from '../utils/calculationUtils';

/**
 * Component that displays pay calculation results
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered pay summary
 */
const PaySummary = ({
  calculatedHours,
  totalHoursWithBreaks,
  totalHoursWithoutBreaks,
  laundryTotal,
  grossPayTotal,
  superAmount,
  taxAmount,
  netPay,
  calculationErrors,
}) => {
  return (
    <Card title="Pay Summary" className="text-center">
      {/* Hours Breakdown */}
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-700 mb-3 text-center">Hours Breakdown</h3>

        {/* Total Hours Section */}
        <div className="mb-3 p-3 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2 text-center">Total Hours</h4>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between items-center p-2 bg-white rounded">
              <span className="text-gray-600">With Breaks:</span>
              <span className="font-semibold text-gray-800">
                {formatHours(totalHoursWithoutBreaks)} hrs
              </span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded">
              <span className="text-gray-600">After 30min Breaks:</span>
              <span className="font-semibold text-blue-700">
                {formatHours(totalHoursWithBreaks)} hrs
              </span>
            </div>
          </div>
        </div>

        {/* Category Hours Breakdown */}
        <div className="text-sm">
          {Object.entries(calculatedHours)
            .filter(([key, value]) => value > 0.005)
            .map(([key, value]) => {
              let label = key.replace(/([A-Z])/g, ' $1');
              label = label.charAt(0).toUpperCase() + label.slice(1);
              if (key === 'tenPmToMidnight') label = '10pm-Midnight M-F';

              return (
                <div key={key} className="flex justify-between items-center p-2 bg-white rounded">
                  <span className="text-gray-600">{label}:</span>
                  <span className="font-semibold text-gray-800">{formatHours(value)} hrs</span>
                </div>
              );
            })}
          {Object.values(calculatedHours).every(v => v <= 0.005) && !calculationErrors.length && (
            <p className="col-span-2 text-center text-gray-500 italic">No hours calculated yet.</p>
          )}
        </div>
      </div>

      {/* Pay Calculation */}
      <div className="space-y-3">
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <span className="text-gray-600">Laundry Allowance:</span>
          <span className="font-semibold text-gray-800">{formatCurrency(laundryTotal)}</span>
        </div>

        <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
          <span className="text-gray-700 font-semibold">Total Gross Pay:</span>
          <span className="font-bold text-blue-800">{formatCurrency(grossPayTotal)}</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 bg-red-50 rounded">
            <span className="text-gray-600">Estimated Tax:</span>
            <span className="font-semibold text-red-600">(-) {formatCurrency(taxAmount)}</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-red-50 rounded">
            <span className="text-gray-600">Estimated Super:</span>
            <span className="font-semibold text-red-600">(-) {formatCurrency(superAmount)}</span>
          </div>
        </div>

        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg mt-4">
          <span className="text-green-800 font-bold">Net Pay (Take Home):</span>
          <span className="text-green-800 font-bold text-xl">{formatCurrency(netPay)}</span>
        </div>
      </div>
    </Card>
  );
};

export default PaySummary;
