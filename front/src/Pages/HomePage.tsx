import React from 'react';
import PropertyFilter from '../Component/PropertyFilter';
import HouseListings from '../Component/HouseListings';
import MapComponent from '../Component/MapComponent';

const HomePage = () => {
  return (
    <div className="flex-1 flex h-screen">
      <div className="w-1/3 p-4 overflow-y-auto">
        <PropertyFilter />
      </div>
      <div className="w-1/3 p-4 overflow-y-auto">
        <HouseListings />
      </div>
      <div className="w-1/3 p-4 overflow-y-auto">
        <MapComponent />
      </div>
    </div>
  );
}

export default HomePage;