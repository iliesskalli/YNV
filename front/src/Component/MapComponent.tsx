import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { House } from '../types';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapComponentProps {
  houses: House[];
  selectedAddress?: { address: string; lat: number; lon: number };
}

const MapComponent: React.FC<MapComponentProps> = ({ houses, selectedAddress }) => {
  const mapRef = useRef<L.Map | null>(null);

  // Filter houses with valid coordinates
  const validHouses = houses.filter(house => house.latitude && house.longitude);

  const center = selectedAddress
    ? [selectedAddress.lat, selectedAddress.lon]
    : validHouses.length > 0
    ? [validHouses[0].latitude!, validHouses[0].longitude!]
    : [48.8566, 2.3522]; 

  useEffect(() => {
    if (selectedAddress && mapRef.current) {
      mapRef.current.setView([selectedAddress.lat, selectedAddress.lon], 13);
    }
  }, [selectedAddress]);

  const MapController = () => {
    const map = useMap();
    mapRef.current = map;
    return null;
  };

  return (
    <div className="h-full w-full rounded-lg overflow-hidden">
      <MapContainer 
        center={center as [number, number]}
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
      >
        <MapController />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {validHouses.map((house) => (
          <Marker 
            key={house._id} 
            position={[house.latitude!, house.longitude!]}
          >
            <Popup>
              <div>
                <h3>{house.title}</h3>
                <p>{house.address}, {house.city}</p>
                <p>Prix: {house.price.toLocaleString()} €</p>
              </div>
            </Popup>
          </Marker>
        ))}
        {selectedAddress && (
          <Marker 
            position={[selectedAddress.lat, selectedAddress.lon]}
          >
            <Popup>
              <div>
                <h3>Adresse sélectionnée</h3>
                <p>{selectedAddress.address}</p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;