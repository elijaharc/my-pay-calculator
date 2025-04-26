import React from 'react';
import Card from './Card';

/**
 * Component that displays external resource links
 * @returns {JSX.Element} Rendered resource links
 */
const ResourceLinks = () => {
  const resources = [
    {
      title: 'Tax Withheld Calculator',
      url: 'https://www.ato.gov.au/Calculators-and-tools/Tax-withheld-calculator/',
    },
    {
      title: 'Simple Tax Calculator',
      url: 'https://www.ato.gov.au/Calculators-and-tools/Host/?anchor=STC&anchor=STC#STC/questions',
    },
    {
      title: 'Ordinary Time Earnings Info',
      url: 'https://www.ato.gov.au/businesses-and-organisations/super-for-employers/paying-super-contributions/how-much-super-to-pay/list-of-payments-that-are-ordinary-time-earnings',
    },
    {
      title: 'Super Guarantee Percentage',
      url: 'https://www.ato.gov.au/rates/key-superannuation-rates-and-thresholds/?anchor=Superguaranteepercentage#Superguaranteepercentage',
    },
  ];

  return (
    <Card title="ATO Resources" className="text-center">
      <ul className="space-y-2">
        {resources.map((resource, index) => (
          <li key={index}>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
            >
              {resource.title}
            </a>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ResourceLinks;
