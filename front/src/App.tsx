import React from 'react';
import HouseListings from './Component/HouseListings';
import PropertyFilter from './Component/PropertyFilter';
import MapComponent from './Component/MapComponent';
import VerticalIconNavbar from './Component/VerticalIconNavbar';
import 'leaflet/dist/leaflet.css';

const App: React.FC = () => {
  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <VerticalIconNavbar />
      <div className="flex-1 flex">
        <div className="w-1/3 p-4 overflow-y-auto">
          <PropertyFilter />
        </div>
        <div className="w-1/3 p-4 overflow-y-auto">
          <HouseListings />
        </div>
        <div className="w-1/3 p-4">
          <MapComponent />
        </div>
      </div>
    </div>
  );
};

export default App;