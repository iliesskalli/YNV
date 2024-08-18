import React, { useEffect, useState } from 'react';
import HouseListings from './Component/HouseListings';
import PropertyFilter from './Component/PropertyFilter';
import 'leaflet/dist/leaflet.css';
import MapComponent from './Component/MapComponent';
import PublicationCard from './Component/CreatePublication'
const App: React.FC = () => {
 

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <div className="w-1/3 p-4 overflow-y-auto">
        <PropertyFilter />
      </div>
      <div className="w-1/3 p-4 overflow-y-auto">
        <HouseListings  />
      </div>
      <div className="w-1/3 p-4">
        <MapComponent />
      </div>
      <PublicationCard></PublicationCard>
    </div>
  );
};

export default App;