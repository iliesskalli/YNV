import React, { useState, ChangeEvent } from 'react';
import { MapPin } from 'lucide-react';

const PropertyFilter: React.FC = () => {
  const [address, setAddress] = useState<string>('Scotland');
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 10000]);

  const handlePriceChange = (value: number, isMin: boolean) => {
    setPriceRange(prev => isMin ? [value, prev[1]] : [prev[0], value]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
      <h2 className="text-2xl font-bold mb-4">Filter</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Address</h3>
        <div className="relative">
          <select
            value={address}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setAddress(e.target.value)}
            className="w-full p-2 border rounded-md appearance-none bg-white"
          >
            <option value="Scotland">Scotland</option>
          </select>
          <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
        <div className="flex justify-between mb-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handlePriceChange(parseInt(e.target.value), true)}
            className="w-1/3 p-2 border rounded-md"
            placeholder="Min"
          />
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handlePriceChange(parseInt(e.target.value), false)}
            className="w-1/3 p-2 border rounded-md"
            placeholder="Max"
          />
        </div>
        <input
          type="range"
          min="100"
          max="10000"
          value={priceRange[1]}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          className="w-full"
        />
        <div className="flex justify-between">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilter;