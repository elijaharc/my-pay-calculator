import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { timeToMinutes } from './utils/calculationUtils';
import {
  DAYS_OF_WEEK,
  UNPAID_BREAK_MINUTES,
  MIN_SHIFT_DURATION_FOR_BREAK_MINUTES,
  DEFAULT_RATES,
  DEFAULT_SUPER_PERCENTAGE,
  TEN_PM_MINUTES,
  MIDNIGHT_END_MINUTES,
} from './constants/payConstants';

// Import components
import Header from './components/Header';
import Alert from './components/Alert';
import Card from './components/Card';
import DailyShiftRow from './components/DailyShiftRow';
import RatesCard from './components/RatesCard';
import PaySummary from './components/PaySummary';
import ResourceLinks from './components/ResourceLinks';

// Main App Component
function App() {
  // --- State Hooks for Input Values ---

  // Initial daily shift setup with test data
  const initialDailyShifts = useMemo(() => {
    return DAYS_OF_WEEK.map(day => {
      // Default shift configuration
      let isWorked = false;
      let startTime = '';
      let endTime = '';

      // Set default test values for specific days
      if (day === 'Thursday') {
        isWorked = true;
        startTime = '15:00'; // 3:00 PM
        endTime = '23:53'; // 11:53 PM
      } else if (day === 'Friday') {
        isWorked = true;
        startTime = '17:15'; // 5:15 PM
        endTime = '23:49'; // 11:49 PM
      } else if (day === 'Sunday') {
        isWorked = true;
        startTime = '15:00'; // 3:00 PM
        endTime = '23:45'; // 11:45 PM
      }

      return {
        day: day,
        isWorked: isWorked,
        startTime: startTime,
        endTime: endTime,
        isPublicHoliday: false, // All are non-holidays
      };
    });
  }, []);

  // State for main inputs
  const [dailyShifts, setDailyShifts] = useState(initialDailyShifts);
  const [rates, setRates] = useState(DEFAULT_RATES);
  const [laundryRatePerShift, setLaundryRatePerShift] = useState(DEFAULT_RATES.laundryPerShift);
  const [superPercentage, setSuperPercentage] = useState(DEFAULT_SUPER_PERCENTAGE);

  // State for calculated results
  const [calculatedHours, setCalculatedHours] = useState({
    weekday: 0,
    saturday: 0,
    sunday: 0,
    publicHoliday: 0,
    tenPmToMidnight: 0,
  });
  const [totalHoursWithBreaks, setTotalHoursWithBreaks] = useState(0);
  const [totalHoursWithoutBreaks, setTotalHoursWithoutBreaks] = useState(0);
  const [laundryTotal, setLaundryTotal] = useState(0);
  const [grossPayTotal, setGrossPayTotal] = useState(0);
  const [superAmount, setSuperAmount] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [netPay, setNetPay] = useState(0);
  const [calculationErrors, setCalculationErrors] = useState([]);

  // --- Input Change Handlers ---

  // Handle daily shift changes - memoized for better performance
  const handleShiftChange = useCallback((index, field, value) => {
    setDailyShifts(prevShifts => {
      const updatedShifts = [...prevShifts];
      updatedShifts[index] = { ...updatedShifts[index], [field]: value };

      // If marking as not worked, clear times and public holiday status
      if (field === 'isWorked' && !value) {
        updatedShifts[index].startTime = '';
        updatedShifts[index].endTime = '';
        updatedShifts[index].isPublicHoliday = false;
      }

      return updatedShifts;
    });
  }, []);

  // Handle rate changes with validation
  const handleRateChange = useCallback((field, value) => {
    // Basic validation to allow only numbers and one decimal point
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setRates(prevRates => ({ ...prevRates, [field]: value }));
    }
  }, []);

  // Handle numeric inputs with validation
  const handleOtherNumericChange = useCallback(
    setter => event => {
      const value = event.target.value;
      // Allow empty string, numbers, and a single decimal point
      if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
        setter(value);
      }
    },
    []
  );

  // --- Calculation Logic ---
  useEffect(() => {
    // Initialize calculation variables
    let weeklyHours = {
      weekday: 0,
      saturday: 0,
      sunday: 0,
      publicHoliday: 0,
      tenPmToMidnight: 0,
    };
    let shiftsWorked = 0;
    let currentErrors = [];
    let totalMinutesWithBreaks = 0;
    let totalMinutesWithoutBreaks = 0;

    // Process each daily shift
    dailyShifts.forEach((shift, index) => {
      // Skip if not worked or times missing
      if (!shift.isWorked || !shift.startTime || !shift.endTime) {
        return;
      }

      shiftsWorked++;

      const startMinutes = timeToMinutes(shift.startTime);
      const endMinutes = timeToMinutes(shift.endTime);

      // Validate time inputs
      if (startMinutes === null || endMinutes === null) {
        if (!currentErrors.some(err => err.includes(shift.day))) {
          currentErrors.push(`Invalid time format for ${shift.day}. Please use HH:MM.`);
        }
        return;
      }

      // Calculate shift duration
      let durationMinutes = 0;
      if (endMinutes >= startMinutes) {
        // Same day shift
        durationMinutes = endMinutes - startMinutes;
      } else {
        // Overnight shift
        durationMinutes = MIDNIGHT_END_MINUTES - startMinutes + endMinutes;
      }

      if (durationMinutes <= 0) return;

      // Apply unpaid break logic
      let paidDurationMinutes = durationMinutes;
      if (durationMinutes >= MIN_SHIFT_DURATION_FOR_BREAK_MINUTES) {
        paidDurationMinutes -= UNPAID_BREAK_MINUTES;
      }
      paidDurationMinutes = Math.max(0, paidDurationMinutes);

      if (paidDurationMinutes <= 0) return;

      // Update total durations
      totalMinutesWithBreaks += paidDurationMinutes;
      totalMinutesWithoutBreaks += durationMinutes;

      // --- Categorize Paid Hours ---
      let currentMinuteTimestamp = startMinutes;
      let paidMinutesAccounted = 0;
      const breakApplies = durationMinutes >= MIN_SHIFT_DURATION_FOR_BREAK_MINUTES;

      // Process minute by minute to categorize hours
      for (let i = 0; i < durationMinutes; i++) {
        const isUnpaidBreakMinute = breakApplies && i < UNPAID_BREAK_MINUTES;

        if (!isUnpaidBreakMinute && paidMinutesAccounted < paidDurationMinutes) {
          // Process this paid minute
          const minuteOfDay = currentMinuteTimestamp % MIDNIGHT_END_MINUTES;
          const dayIndex = (index + Math.floor(currentMinuteTimestamp / MIDNIGHT_END_MINUTES)) % 7;
          const currentDayName = DAYS_OF_WEEK[dayIndex];
          const isCurrentDayPublicHoliday =
            dailyShifts[dayIndex]?.isPublicHoliday ?? shift.isPublicHoliday;

          // Categorize hour based on day and time
          if (isCurrentDayPublicHoliday) {
            weeklyHours.publicHoliday += 1 / 60;
          } else if (currentDayName === 'Sunday') {
            weeklyHours.sunday += 1 / 60;
          } else if (currentDayName === 'Saturday') {
            weeklyHours.saturday += 1 / 60;
          } else {
            // Weekday (Monday-Friday)
            if (minuteOfDay >= TEN_PM_MINUTES && minuteOfDay < MIDNIGHT_END_MINUTES) {
              weeklyHours.tenPmToMidnight += 1 / 60;
            } else {
              weeklyHours.weekday += 1 / 60;
            }
          }
          paidMinutesAccounted++;
        } else if (paidMinutesAccounted >= paidDurationMinutes) {
          break; // Exit loop if all paid minutes are accounted for
        }

        currentMinuteTimestamp++;
      }
    });

    // Update state with calculated values
    setCalculatedHours(weeklyHours);
    setCalculationErrors(currentErrors);
    setTotalHoursWithBreaks(totalMinutesWithBreaks / 60);
    setTotalHoursWithoutBreaks(totalMinutesWithoutBreaks / 60);

    // --- Calculate Pay ---
    // Parse rates as numbers
    const numWeekdayRate = parseFloat(rates.weekday || 0);
    const numSaturdayRate = parseFloat(rates.saturday || 0);
    const numSundayRate = parseFloat(rates.sunday || 0);
    const numPublicHolidayRate = parseFloat(rates.publicHoliday || 0);
    const numTenPmToMidnightRate = parseFloat(rates.tenPmToMidnight || 0);
    const numLaundryRate = parseFloat(laundryRatePerShift || 0);
    const numSuperPercentage = parseFloat(superPercentage || 0);

    // Calculate pay for each category
    const weekdayPay = weeklyHours.weekday * numWeekdayRate;
    const saturdayPay = weeklyHours.saturday * numSaturdayRate;
    const sundayPay = weeklyHours.sunday * numSundayRate;
    const publicHolidayPay = weeklyHours.publicHoliday * numPublicHolidayRate;
    const tenPmToMidnightPay = weeklyHours.tenPmToMidnight * numTenPmToMidnightRate;

    // Calculate totals
    const currentLaundryTotal = shiftsWorked * numLaundryRate;
    setLaundryTotal(currentLaundryTotal);

    const currentGrossTotal =
      weekdayPay +
      saturdayPay +
      sundayPay +
      publicHolidayPay +
      tenPmToMidnightPay +
      currentLaundryTotal;
    setGrossPayTotal(currentGrossTotal);

    // Calculate superannuation
    const currentSuperAmount = currentGrossTotal * (numSuperPercentage / 100);
    setSuperAmount(currentSuperAmount);

    // Calculate tax based on weekly gross
    const calculatedTax = calculateWeeklyTax(currentGrossTotal);
    const currentTaxAmount = parseFloat(calculatedTax) || 0;
    setTaxAmount(currentTaxAmount);

    // Calculate net pay
    const currentNetPay = currentGrossTotal - currentTaxAmount;
    setNetPay(Math.max(0, currentNetPay));
  }, [dailyShifts, rates, laundryRatePerShift, superPercentage]);

  /**
   * Calculates weekly tax based on ATO guidelines
   * @param {number} gross - Gross weekly income
   * @returns {string} Tax amount with 2 decimal places
   */
  const calculateWeeklyTax = gross => {
    if (gross <= 370) return '0.00';
    else if (gross <= 900) return ((gross - 370) * 0.19).toFixed(2);
    else if (gross <= 1300) return (101.3 + (gross - 900) * 0.325).toFixed(2);
    else return (231.3 + (gross - 1300) * 0.37).toFixed(2);
  };

  // --- Render JSX ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <Header />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Daily Shifts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Disclaimer Alert */}
            <Alert type="info" title="Quick Tips">
              30-min unpaid break auto-deducted for shifts ≥ 5 hours
              {/* <br /> */}
              Tax is an estimate only - verify with official sources
            </Alert>

            {/* Error Messages */}
            {calculationErrors.length > 0 && (
              <Alert type="error" title="Input Errors">
                {calculationErrors}
              </Alert>
            )}

            {/* Daily Shifts Card */}
            <Card title="Daily Shifts">
              <div className="space-y-4">
                {dailyShifts.map((shift, index) => (
                  <DailyShiftRow
                    key={shift.day}
                    shift={shift}
                    index={index}
                    onShiftChange={handleShiftChange}
                  />
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Rates & Results */}
          <div className="space-y-6">
            {/* Rates Card */}
            <RatesCard
              rates={rates}
              onRateChange={handleRateChange}
              laundryRatePerShift={laundryRatePerShift}
              onLaundryRateChange={handleOtherNumericChange(setLaundryRatePerShift)}
              superPercentage={superPercentage}
              onSuperPercentageChange={handleOtherNumericChange(setSuperPercentage)}
            />

            {/* Results Card */}
            <PaySummary
              calculatedHours={calculatedHours}
              totalHoursWithBreaks={totalHoursWithBreaks}
              totalHoursWithoutBreaks={totalHoursWithoutBreaks}
              laundryTotal={laundryTotal}
              grossPayTotal={grossPayTotal}
              superAmount={superAmount}
              taxAmount={taxAmount}
              netPay={netPay}
              calculationErrors={calculationErrors}
            />

            {/* ATO Links */}
            <ResourceLinks />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
