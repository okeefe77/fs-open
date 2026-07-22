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
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: v => /^\+?(\d{1,3})?[-. ]?\(?\d{2,4}\)?[-. ]?\d{3,4}[-. ]?\d{3,9}$/.test(v),
      message: props => `${props.value} is not a valid phone number`
    },
    required: true
  }
});

personSchema.set('toJSON', {
  transform: (doc, returned) => {
    returned.id = returned._id.toString();
    delete returned._id;
    delete returned.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);