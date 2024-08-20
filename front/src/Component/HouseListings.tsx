import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Maximize2, BedDouble, Square } from 'lucide-react';
import { House } from '../types';

interface HouseListingsProps {
  houses: House[];
}

const HouseListings: React.FC<HouseListingsProps> = ({ houses }) => {
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    navigate(`/property/${id}`);
  };

  const HouseCard: React.FC<House> = ({
    _id,
    image,
    price,
    address,
    city,
    typeOfHousing,
    title,
    rooms,
    bedrooms,
    area
  }) => (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-md w-full mb-4 cursor-pointer" 
      onClick={() => handleCardClick(_id)}
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-2/5 lg:w-1/2 h-64 md:h-auto">
          <img
            src={image ? `http://localhost:5000/uploads/${image}` : "/api/placeholder/400/300"}
            alt={`${address}, ${city}`}
            className="w-full h-full object-cover"
          />
          <button 
            className="absolute top-2 right-2 bg-white rounded-full p-1"
            onClick={(e) => {
              e.stopPropagation();
              // Add logic for favoriting/liking a property here
            }}
          >
            <Heart className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        <div className="p-4 md:w-3/5 lg:w-1/2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-semibold">{typeOfHousing || 'maison'}</span>
            </div>
            <span className="text-lg font-bold text-blue-600">{price.toLocaleString()} €</span>
          </div>
          <h2 className="text-lg font-semibold mb-2 truncate">{title}</h2>
          <p className="text-gray-600 text-sm mb-4 truncate">{address}, {city}</p>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              <Maximize2 className="h-5 w-5 mr-1 text-gray-500" />
              <span className="text-sm">{area} m²</span>
            </div>
            <div className="flex items-center">
              <BedDouble className="h-5 w-5 mr-1 text-gray-500" />
              <span className="text-sm">{bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Square className="h-5 w-5 mr-1 text-gray-500" />
              <span className="text-sm">{rooms}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!Array.isArray(houses)) {
    console.error('Houses prop is not an array:', houses);
    return <div>No houses available</div>;
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">{houses.length} Résultats</h1>
      <div className="space-y-4">
        {houses.map((house) => (
          <HouseCard key={house._id} {...house} />
        ))}
      </div>
    </div>
  );
};

export default HouseListings;