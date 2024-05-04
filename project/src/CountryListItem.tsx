import React from 'react';
import './App.css';

interface Props {
  country: {
    code: string;
    name: string;
  };
  onSelect: () => void;
  selected: boolean;
}

const predefinedColors = ['#ff8080', '#80ff80', '#8080ff', '#ffff80', '#80ffff'];

const CountryListItem: React.FC<Props> = ({ country, onSelect, selected }) => {
  let backgroundColor = '';
  if (selected) {
    const randomColor = predefinedColors[Math.floor(Math.random() * predefinedColors.length)];
    backgroundColor = randomColor;
  }

  const handleClick = () => {
    onSelect();
  };

  return (
    <li
      className={`country-item ${selected ? 'selected' : ''}`}
      style={{ backgroundColor }}
      onClick={handleClick}
    >
      {country.name} ({country.code})
    </li>
  );
};

export default CountryListItem;
