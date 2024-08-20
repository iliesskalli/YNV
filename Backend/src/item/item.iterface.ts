import { Document } from 'mongoose';

export interface Item extends Document {
  name?: string;
  description?: string;
  price: number;
  image?: string;
  title?: string;
  address: string;
  city: string;
  typeOfHousing?: string;
  rooms?: number;
  bedrooms?: number;
  area?: number;
  latitude?: number;
  longitude?: number;
}
