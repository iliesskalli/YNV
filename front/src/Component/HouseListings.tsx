import React, { useState, useEffect } from 'react';

interface HouseCardProps {
  image: string;
  title: string;
  price: number;
  address: string;
}

const HouseCard: React.FC<HouseCardProps> = ({ image, title, price, address }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md mb-4 w-full">
    <div className="relative">
      <img 
        src={`http://localhost:5000/uploads/${image}`} 
        alt={title} 
        className="w-full h-48 object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = '/placeholder-image.jpg';
        }}
      />
    </div>
    <div className="p-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {address}
        </div>
        <span className="text-blue-600 font-bold">${price}</span>
      </div>
    </div>
  </div>
);

interface House {
  image: string;
  title: string;
  price: number;
  address: string;
}

const HouseListings: React.FC = () => {
  const [houses, setHouses] = useState<House[]>([]);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await fetch('http://localhost:5000/item');
        const data = await response.json();
        setHouses(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error('Error fetching house data:', error);
      }
    };

    fetchHouses();
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">{houses.length} Results in city</h1>
      <div className="space-y-4">
        {houses.map((house, index) => (
          <HouseCard 
            key={index}
            image={house.image}
            title={house.title}
            price={house.price}
            address={house.address}
          />
        ))}
      </div>
    </div>
  );
};

export default HouseListings;
