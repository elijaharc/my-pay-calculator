/**
 * Constants for pay calculation
 */

// Day names
export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

// Break rules
export const UNPAID_BREAK_MINUTES = parseInt(import.meta.env.VITE_UNPAID_BREAK_MINUTES || 30);
export const MIN_SHIFT_DURATION_FOR_BREAK_MINUTES = parseInt(
  import.meta.env.VITE_MIN_SHIFT_DURATION_FOR_BREAK || 300
); // 5 hours

// Default pay rates
export const DEFAULT_RATES = {
  weekday: import.meta.env.VITE_DEFAULT_WEEKDAY_RATE || '27.17',
  saturday: import.meta.env.VITE_DEFAULT_SATURDAY_RATE || '33.96',
  sunday: import.meta.env.VITE_DEFAULT_SUNDAY_RATE || '40.76',
  publicHoliday: import.meta.env.VITE_DEFAULT_PUBLIC_HOLIDAY_RATE || '61.13',
  tenPmToMidnight: import.meta.env.VITE_DEFAULT_NIGHT_RATE || '29.89', // 10pm-12am M-F Rate
  laundryPerShift: import.meta.env.VITE_DEFAULT_LAUNDRY_ALLOWANCE || '1.25',
};

// Default superannuation percentage
export const DEFAULT_SUPER_PERCENTAGE = import.meta.env.VITE_DEFAULT_SUPER_PERCENTAGE || '11.5';

// Time constants
export const MIDNIGHT_START_MINUTES = 0;
export const MIDNIGHT_END_MINUTES = 24 * 60;
export const TEN_PM_MINUTES = 22 * 60;
