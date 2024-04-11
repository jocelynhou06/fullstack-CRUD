const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const propertySchema = new Schema ({
  sale_type :String,
  sold_date: Number,
  property_type: String,
  address: String,
  city: String,
  state_province: String,
  zip: Number,
  price: Number,
  beds: Number,
  baths: Number,
  location: String,
  squareFt: Number,
  lotsize: Number,
  year_built: Number,
  days_on_market: Number,
  price_perSqFt: Number,
  hoa: Number,
  status: String,
  next_open: String,
  next_open_end: String,
  url: String,
  source: String,
  mls: String,
  favorite: String,
  interested: String,
  lat: Number,
  long: Number,
  votes: Number,
  net_score: Number
})


const Property = mongoose.model('properties', propertySchema)
module.exports = Property; 