import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Share2, Calendar, MapPin, Maximize2, BedDouble, Square } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface House {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  title: string;
  address: string;
  city: string;
  typeOfHousing: string;
  rooms: number;
  bedrooms: number;
  area: number;
}

const PropertyDetails: React.FC = () => {
  const [property, setProperty] = useState<House | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/item/${id}`);
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto">
      <div className="mb-4">
        <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">New - 15 hours ago</span>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="w-full lg:w-2/3 space-y-8">
          {/* Main Image */}
          <div className="relative">
            <img 
              src={property.image ? `http://localhost:5000/uploads/${property.image}` : "/api/placeholder/800/600"} 
              alt={property.title} 
              className="w-full h-64 sm:h-96 object-cover rounded-lg" 
            />
          </div>

          {/* Property Details */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{property.price.toLocaleString()} €/mo</h1>
              <div className="flex flex-wrap items-center gap-4 mb-2">
                <div className="flex items-center">
                  <BedDouble className="h-5 w-5 mr-1 text-gray-500" />
                  <span>{property.bedrooms} chambres</span>
                </div>
                <div className="flex items-center">
                  <Square className="h-5 w-5 mr-1 text-gray-500" />
                  <span>{property.rooms} pièces</span>
                </div>
                <div className="flex items-center">
                  <Maximize2 className="h-5 w-5 mr-1 text-gray-500" />
                  <span>{property.area} m²</span>
                </div>
              </div>
              <p className="text-lg text-gray-600">{property.address}, {property.city}</p>
            </div>
            <div className="flex space-x-4">
              <button className="p-2 border rounded-full"><Heart /></button>
              <button className="p-2 border rounded-full"><Share2 /></button>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p>{property.description}</p>
          </div>

          {/* Get moving quotes button */}
          <button className="w-full bg-blue-500 text-white py-2 rounded">
            Get moving quotes
          </button>

          {/* Leaflet Map */}
          <div className="h-64 sm:h-96 relative">
            <MapContainer 
              center={[48.8566, 2.3522]} 
              zoom={13} 
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false} // Optional: Disable scroll zoom to prevent interference with page scrolling
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[48.8566, 2.3522]}>
                <Popup>{property.address}</Popup>
              </Marker>
            </MapContainer>
          </div>

          <button className="w-full border border-gray-300 rounded py-2 flex items-center justify-center">
            <MapPin className="mr-2" />
            Add a commute
          </button>
        </div>

        {/* Contact Form */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-md lg:sticky lg:top-8">
            <h2 className="text-xl font-semibold mb-4">More about this property</h2>
            <form>
              <input type="text" placeholder="Full name*" className="w-full mb-4 p-2 border rounded" />
              <input type="email" placeholder="Email*" className="w-full mb-4 p-2 border rounded" />
              <input type="tel" placeholder="Phone" className="w-full mb-4 p-2 border rounded" />
              <div className="flex items-center mb-4">
                <Calendar className="mr-2" />
                <input type="text" placeholder="Desired move-in date*" className="w-full p-2 border rounded" />
              </div>
              <textarea placeholder={`I am interested in ${property.address}.`} className="w-full mb-4 p-2 border rounded" rows={4}></textarea>
              <button type="submit" className="w-full bg-black text-white py-2 rounded">Send</button>
            </form>
            <p className="text-xs mt-2 text-gray-500">
              By proceeding, you consent to receive calls and texts at the
              number you provided, including marketing by autodialer and
              prerecorded and artificial voice, and email, from realtor.com
              and others about your inquiry and other home-related matters,
              but not as a condition of any purchase. More.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
