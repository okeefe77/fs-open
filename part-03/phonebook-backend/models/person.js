require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
const url = process.env.MONGODB_URI;

console.log("Connecting to", url);

mongoose.connect(url, { family: 4 })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch(error => {
    console.error('Database connection error:', error);
    process.exit(1);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

personSchema.set('toJSON', {
  transform: (doc, returned) => {
    returned.id = returned._id.toString();
    delete returned._id;
    delete returned.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);