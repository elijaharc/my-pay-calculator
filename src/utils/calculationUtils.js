/**
 * Pay calculation utility functions
 */

/**
 * Parses HH:MM time string to minutes from midnight
 * @param {string} timeStr - Time in HH:MM format
 * @returns {number|null} Minutes from midnight or null if invalid
 */
export const timeToMinutes = timeStr => {
  if (!timeStr || !timeStr.includes(':')) return null;
  const [hours, minutes] = timeStr.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes)) return null;
  return hours * 60 + minutes;
};

/**
 * Formats hours for display with 2 decimal places
 * @param {number} hours - Hours to format
 * @returns {string} Formatted hours string
 */
export const formatHours = hours => hours.toFixed(2);

/**
 * Formats currency in AUD format
 * @param {number} value - Value to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = value => {
  return value.toLocaleString('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

/**
 * Calculates weekly tax based on ATO guidelines
 * @param {number} gross - Gross weekly income
 * @returns {string} Tax amount with 2 decimal places
 */
export const calculateWeeklyTax = gross => {
  if (gross <= 370) return '0.00';
  else if (gross <= 900) return ((gross - 370) * 0.19).toFixed(2);
  else if (gross <= 1300) return (101.3 + (gross - 900) * 0.325).toFixed(2);
  else return (231.3 + (gross - 1300) * 0.37).toFixed(2);
};
