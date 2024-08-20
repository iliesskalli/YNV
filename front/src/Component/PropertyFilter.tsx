import React, { ChangeEvent, useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import axios from 'axios';

interface FilterCriteria {
  address: string;
  minPrice: number;
  maxPrice: number;
}

interface Suggestion {
  display_name: string;
  lat: string;
  lon: string;
}

interface PropertyFilterProps {
  onFilterChange: (criteria: Partial<FilterCriteria>) => void;
  onAddressSelect: (address: string, lat: number, lon: number) => void;
  filterCriteria: FilterCriteria;
}

const PropertyFilter: React.FC<PropertyFilterProps> = ({ onFilterChange, onAddressSelect, filterCriteria }) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleAddressChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onFilterChange({ address: value });

    if (value.length > 2) {
      try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}`);
        setSuggestions(response.data);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching address suggestions:', error);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    onFilterChange({ address: suggestion.display_name });
    onAddressSelect(suggestion.display_name, parseFloat(suggestion.lat), parseFloat(suggestion.lon));
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handlePriceChange = (value: number, isMin: boolean) => {
    onFilterChange(isMin ? { minPrice: value } : { maxPrice: value });
  };

  useEffect(() => {
    const handleClickOutside = () => setShowSuggestions(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
      <h2 className="text-2xl font-bold mb-4">Filter</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Address</h3>
        <div className="relative">
          <input
            type="text"
            value={filterCriteria.address}
            onChange={handleAddressChange}
            className="w-full p-2 border rounded-md appearance-none bg-white"
            placeholder="Enter address or city"
          />
          <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
              {suggestions.map((suggestion, index) => (
                <li 
                  key={index} 
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
        <div className="flex justify-between mb-2">
          <input
            type="number"
            value={filterCriteria.minPrice}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handlePriceChange(parseInt(e.target.value), true)}
            className="w-1/3 p-2 border rounded-md"
            placeholder="Min"
          />
          <input
            type="number"
            value={filterCriteria.maxPrice}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handlePriceChange(parseInt(e.target.value), false)}
            className="w-1/3 p-2 border rounded-md"
            placeholder="Max"
          />
        </div>
        <input
          type="range"
          min="0"
          max="10000"
          value={filterCriteria.maxPrice}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handlePriceChange(parseInt(e.target.value), false)}
          className="w-full"
        />
        <div className="flex justify-between">
          <span>${filterCriteria.minPrice}</span>
          <span>${filterCriteria.maxPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilter;