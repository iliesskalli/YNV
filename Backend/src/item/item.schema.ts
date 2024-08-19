// import { Schema } from 'mongoose';

// export const ItemSchema = new Schema({
//   name: { type: String, required: false },
//   description: { type: String, required: false },
//   price: { type: Number, required: true },
//   image: { type: String, required: false },
//   title: { type: String, required: false },
//   address: { type: String, required: true },
//   city: { type: String, required: true },
//   typeOfHousing: { type: String, required: false },
// });
import { Schema } from 'mongoose';

export const ItemSchema = new Schema({
  name: { type: String, required: false },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  image: { type: String, required: false },
  title: { type: String, required: false },
  address: { type: String, required: true },
  city: { type: String, required: true },
  typeOfHousing: { type: String, required: false },
  rooms: { type: Number, required: false },
  bedrooms: { type: Number, required: false },
  area: { type: Number, required: false },
  floor: { type: String, required: false },
});
