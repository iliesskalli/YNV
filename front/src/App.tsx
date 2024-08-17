import React from 'react';
import HouseListings from './Component/HouseListings';

const App: React.FC = () => {
 

  return (
    <div className="center">
      <div className="w-1/3 p-4 overflow-y-auto">
        <HouseListings  />
      </div>
    </div>
  );
};

export default App;