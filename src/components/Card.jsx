import React from 'react';

/**
 * Card component for containing sections of the UI
 * @param {string} title - Card title
 * @param {React.ReactNode} children - Card content
 * @param {string} className - Additional CSS classes
 * @returns {JSX.Element} Rendered card
 */
const Card = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}>
      {title && <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;
