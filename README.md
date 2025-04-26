# My Pay Calculator

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![ReactJS](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.3.1-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.3-38B2AC?logo=tailwind-css&logoColor=white)

A modern, responsive web application for calculating weekly pay, tax estimates, and superannuation based on shift schedules and rates. Built with React and Tailwind CSS.

## Features

- **🗓 Weekly Shift Management**: Input daily shift times with easy-to-use time pickers
- **💰 Multiple Pay Rate Categories**: Support for weekday, Saturday, Sunday, Public Holiday, and night shift rates
- **🧾 Automatic Calculations**:
  - Automatic 30-minute unpaid break deduction for shifts ≥ 5 hours
  - Appropriate rate application based on day and time
  - Automatic shift categorization and pay calculation
  - Support for overnight shifts that span midnight
- **💵 Comprehensive Pay Summary**:
  - Detailed hours breakdown by category
  - Gross pay calculation
  - Laundry allowance
  - Estimated tax calculation based on ATO guidelines
  - Superannuation calculation
  - Take-home pay calculation
- **📱 Responsive Design**: Works on mobile, tablet, and desktop devices
- **🔗 Resource Links**: Quick access to ATO calculators and superannuation information

## Screenshots

_[Add screenshots here after deployment]_

## Technologies Used

- **React**: UI library for building the interface
- **Vite**: Fast, modern build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **ESLint & Prettier**: For code quality and formatting

## Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/my-pay-calculator.git
   cd my-pay-calculator
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory based on `.env.example`:

   ```
   # Default pay rates
   VITE_DEFAULT_WEEKDAY_RATE=27.17
   VITE_DEFAULT_SATURDAY_RATE=33.96
   VITE_DEFAULT_SUNDAY_RATE=40.76
   VITE_DEFAULT_PUBLIC_HOLIDAY_RATE=61.13
   VITE_DEFAULT_NIGHT_RATE=29.89
   VITE_DEFAULT_LAUNDRY_ALLOWANCE=1.25

   # Default superannuation percentage
   VITE_DEFAULT_SUPER_PERCENTAGE=11.5

   # Break rules
   VITE_UNPAID_BREAK_MINUTES=30
   VITE_MIN_SHIFT_DURATION_FOR_BREAK=300
   ```

## Usage

1. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Open your browser and visit `http://localhost:5173`

3. Enter your shift times for each day:

   - Check the "Worked?" box for days you worked
   - Enter start and end times for each shift
   - Mark public holidays if applicable

4. Adjust rates and settings in the "Rates & Deductions" panel:

   - Hourly rates for different day types
   - Laundry allowance per shift
   - Superannuation percentage

5. View your calculated results in the "Pay Summary" panel:
   - Hours breakdown by category
   - Pay calculation with gross and net amounts
   - Estimated tax and superannuation

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Run Prettier to format code

## Configuration

You can adjust the default settings by modifying the `.env` file:

- Default hourly rates for different shift types
- Default laundry allowance
- Default superannuation percentage
- Break duration and requirements

## Tax Calculation

Tax estimates are based on simplified ATO guidelines using the following brackets:

- $0 - $370: 0%
- $371 - $900: 19% of excess over $370
- $901 - $1,300: $101.30 + 32.5% of excess over $900
- $1,301+: $231.30 + 37% of excess over $1,300

**Note**: These are estimates only and should be verified with the ATO's official calculators.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This calculator provides estimates only. For official tax and superannuation information, please consult the Australian Taxation Office (ATO) or a financial professional.

## Acknowledgements

- [Australian Taxation Office](https://www.ato.gov.au/) for tax and superannuation guidelines
- [React](https://react.dev/) for the UI framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Vite](https://vitejs.dev/) for the build tool
