import React, { ChangeEvent } from 'react';

interface FilterCriteria {
  minPrice: number;
  maxPrice: number;
}

interface PropertyFilterProps {
  onFilterChange: (criteria: Partial<FilterCriteria>) => void;
  filterCriteria: FilterCriteria;
}

const PropertyFilter: React.FC<PropertyFilterProps> = ({ onFilterChange, filterCriteria }) => {
  const handlePriceChange = (value: number, isMin: boolean) => {
    onFilterChange(isMin ? { minPrice: value } : { maxPrice: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
      <h2 className="text-2xl font-bold mb-4">Filter</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
        <div className="flex justify-between mb-2">
          <input
            type="number"
            value={filterCriteria.minPrice}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handlePriceChange(parseInt(e.target.value) || 0, true)}
            className="w-1/3 p-2 border rounded-md"
            placeholder="Min"
          />
          <input
            type="number"
            value={filterCriteria.maxPrice}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handlePriceChange(parseInt(e.target.value) || 0, false)}
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
          <span>€{filterCriteria.minPrice}</span>
          <span>€{filterCriteria.maxPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilter;