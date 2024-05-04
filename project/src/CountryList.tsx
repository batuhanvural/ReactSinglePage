import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from './queries';
import CountryListItem from './CountryListItem';
import './App.css';

const CountryList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [filteredCountries, setFilteredCountries] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (data) {
      const countries = data.countries;
      if (countries.length >= 10) {
        setSelectedItem(9);
      } else if (countries.length > 0) {
        setSelectedItem(countries.length - 1);
      }
      setFilteredCountries(countries);
    }
  }, [data]);
  
  useEffect(() => {
    if (searchTerm) {
      const filtered = data?.countries.filter((country: any) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(filtered || []);
    } else {
      setFilteredCountries(data?.countries || []);
    }
  }, [searchTerm, data]);
  

  useEffect(() => {
    if (filteredCountries.length === 0 && data?.countries) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }

    if (selectedItem !== null) {
      const selectedItemInFiltered = filteredCountries.findIndex(
        (country: any, index: number) => index === selectedItem
      );
      if (selectedItemInFiltered === -1) {
        setSelectedItem(null); // Seçili öğe filtrelenmiş listede yoksa, seçili öğeyi iptal et
      }
    } else {
      if (filteredCountries.length > 0) {
        setSelectedItem(filteredCountries.length - 1); // Hiçbir öğe seçili değilse ve filtrelenmiş ülkeler listesi boş değilse, listenin son öğesini seç
      }
    }
  }, [filteredCountries, selectedItem, data]);

  const handleSelectItem = (index: number) => {
    setSelectedItem((prevSelectedItem) => {
      // Eğer tıklanan öğe zaten seçiliyse, seçimi iptal et
      return prevSelectedItem === index ? null : index;
    });
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="country-list-container">
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="country-list">
        {filteredCountries.map((country: any, index: number) => (
          <CountryListItem
            key={country.code}
            country={country}
            onSelect={() => handleSelectItem(index)}
            selected={index === selectedItem}
          />
        ))}
        {showMessage && <p className="message">No results found.</p>}
      </ul>
    </div>
  );
};

export default CountryList;
