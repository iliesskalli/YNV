import React, { useState, useEffect, useCallback } from 'react';
import PropertyFilter from '../Component/PropertyFilter';
import HouseListings from '../Component/HouseListings';
import MapComponent from '../Component/MapComponent';
import { House } from '../types';

interface FilterCriteria {
  minPrice: number;
  maxPrice: number;
}

const HomePage: React.FC = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [filteredHouses, setFilteredHouses] = useState<House[]>([]);
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    minPrice: 0,
    maxPrice: 10000
  });

  const fetchHouses = async () => {
    try {
      const response = await fetch('http://localhost:5000/item');
      const data = await response.json();
      console.log('Fetched houses:', data);
      if (Array.isArray(data)) {
        setHouses(data);
        setFilteredHouses(data);
      } else {
        console.error('Fetched data is not an array:', data);
        setHouses([]);
        setFilteredHouses([]);
      }
    } catch (error) {
      console.error('Error fetching houses:', error);
      setHouses([]);
      setFilteredHouses([]);
    }
  };

  const applyFilters = useCallback(() => {
    if (!Array.isArray(houses)) {
      console.error('Houses is not an array:', houses);
      setFilteredHouses([]);
      return;
    }
    const filtered = houses.filter(house => {
      return (
        house.price >= filterCriteria.minPrice &&
        house.price <= filterCriteria.maxPrice
      );
    });
    console.log('Filtered houses:', filtered);
    setFilteredHouses(filtered);
  }, [houses, filterCriteria]);

  useEffect(() => {
    fetchHouses();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleFilterChange = (newCriteria: Partial<FilterCriteria>) => {
    setFilterCriteria(prev => ({ ...prev, ...newCriteria }));
  };

  return (
    <div className="flex-1 flex h-screen">
      <div className="w-1/3 p-4 overflow-y-auto">
        <PropertyFilter 
          onFilterChange={handleFilterChange} 
          filterCriteria={filterCriteria} 
        />
      </div>
      <div className="w-1/3 p-4 overflow-y-auto">
        <HouseListings houses={filteredHouses} />
      </div>
      <div className="w-1/3 p-4 overflow-y-auto">
        <MapComponent />
      </div>
    </div>
  );
}

export default HomePage;