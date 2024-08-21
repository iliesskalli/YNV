import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { House } from '../types';

// Import default marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Custom house icon SVG
const houseSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4a5568" width="32px" height="32px">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
`;

const houseIcon = new L.DivIcon({
  html: houseSvg,
  className: 'house-div-icon',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapComponentProps {
  houses: House[];
  selectedLocation?: { location: string; lat: number; lon: number };
}

const MapComponent: React.FC<MapComponentProps> = ({ houses, selectedLocation }) => {
  const mapRef = useRef<L.Map | null>(null);

  // Use all houses for determining the center, but only render those with valid coordinates
  const center = selectedLocation
    ? [selectedLocation.lat, selectedLocation.lon]
    : houses.length > 0 && houses[0].latitude && houses[0].longitude
    ? [houses[0].latitude, houses[0].longitude]
    : [48.8566, 2.3522]; // Paris coordinates as default

  useEffect(() => {
    if (selectedLocation && mapRef.current) {
      mapRef.current.setView([selectedLocation.lat, selectedLocation.lon], 13);
    }
  }, [selectedLocation]);

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
        {houses.map((house) => {
          if (house.latitude && house.longitude) {
            return (
              <Marker 
                key={house._id} 
                position={[house.latitude, house.longitude]}
                icon={houseIcon}
              >
                <Popup>
                  <div>
                    <h3>{house.title}</h3>
                    <p>{house.address}, {house.city}</p>
                    <p>Prix: {house.price.toLocaleString()} €</p>
                  </div>
                </Popup>
              </Marker>
            );
          }
          return null;
        })}
        {selectedLocation && (
          <Marker 
            position={[selectedLocation.lat, selectedLocation.lon]}
          >
            <Popup>
              <div>
                <h3>Location sélectionnée</h3>
                <p>{selectedLocation.location}</p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;