// types.ts
export interface House {
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
  latitude?: number;
  longitude?: number;
}

export interface FilterCriteria {
  location: string;  // Changed from 'address' to 'location'
  minPrice: number;
  maxPrice: number;
}