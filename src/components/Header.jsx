import React from 'react';

/**
 * Header component for the application
 * @returns {JSX.Element} Rendered header
 */
const Header = ({
  title = 'Weekly Pay Calculator',
  subtitle = 'Calculate your take-home pay with precision',
}) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">{title}</h1>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  );
};

export default Header;
