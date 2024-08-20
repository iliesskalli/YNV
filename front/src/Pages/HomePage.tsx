import React, { useState, useEffect } from 'react';
import PropertyFilter from '../Component/PropertyFilter';
import HouseListings from '../Component/HouseListings';
import MapComponent from '../Component/MapComponent';
import { House, FilterCriteria } from '../types';

const HomePage: React.FC = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [filteredHouses, setFilteredHouses] = useState<House[]>([]);
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    address: '',
    minPrice: 0,
    maxPrice: 10000,
    minArea: 0,
    maxArea: 1000,
  });
  const [selectedAddress, setSelectedAddress] = useState<{ address: string; lat: number; lon: number } | undefined>();

  useEffect(() => {
    fetchHouses();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [houses, filterCriteria]);

  const fetchHouses = async () => {
    try {
      const response = await fetch('http://localhost:5000/item');
      const data = await response.json();
      console.log('Fetched houses:', data);
      setHouses(data);
      setFilteredHouses(data);
    } catch (error) {
      console.error('Error fetching houses:', error);
    }
  };

  const applyFilters = () => {
    const filtered = houses.filter(house => {
      const addressMatch = (house.address?.toLowerCase().includes(filterCriteria.address.toLowerCase()) ?? false) ||
                           (house.city?.toLowerCase().includes(filterCriteria.address.toLowerCase()) ?? false);
      const priceMatch = (typeof house.price === 'number') && 
                         house.price >= filterCriteria.minPrice && 
                         house.price <= filterCriteria.maxPrice;
      const areaMatch = (typeof house.area === 'number') &&
                        house.area >= filterCriteria.minArea &&
                        house.area <= filterCriteria.maxArea;
      return addressMatch && priceMatch && areaMatch;
    });
    console.log('Filtered houses:', filtered);
    setFilteredHouses(filtered);
  };

  const handleFilterChange = (newCriteria: Partial<FilterCriteria>) => {
    setFilterCriteria(prev => ({ ...prev, ...newCriteria }));
  };

  const handleAddressSelect = (address: string, lat: number, lon: number) => {
    setSelectedAddress({ address, lat, lon });
  };

  return (
    <div className="flex-1 flex h-screen">
      <div className="w-1/3 p-4 overflow-y-auto">
        <PropertyFilter 
          onFilterChange={handleFilterChange} 
          onAddressSelect={handleAddressSelect}
          filterCriteria={filterCriteria} 
        />
      </div>
      <div className="w-1/3 p-4 overflow-y-auto">
        <HouseListings houses={filteredHouses} />
      </div>
      <div className="w-1/3 p-4 overflow-y-auto">
        <MapComponent houses={filteredHouses} selectedAddress={selectedAddress} />
      </div>
    </div>
  );
}

export default HomePage;
