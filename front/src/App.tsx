import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HouseListings from './Component/HouseListings';
import PropertyFilter from './Component/PropertyFilter';
import MapComponent from './Component/MapComponent';
import VerticalIconNavbar from './Component/VerticalIconNavbar';
import RecyclingPage from './Pages/Recycling';
import 'leaflet/dist/leaflet.css';

const MainContent: React.FC = () => (
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
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-row h-screen overflow-hidden">
        <VerticalIconNavbar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/recycling" element={<RecyclingPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;