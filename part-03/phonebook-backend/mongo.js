require('dotenv').config();
const mongoose = require('mongoose');

const password = process.argv[2];
const url = process.env.MONGODB_URI;

console.log(url);

mongoose.set('strictQuery', false);

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 4) {
  const name = process.argv[2];
  const number = process.argv[3];
  const person = new Person({
    name,
    number
  });

  mongoose.connect(url, { family: 4 }).then(() => {
    person.save().then(result => {
      console.log(`Entry for ${name} saved to database`);
      mongoose.connection.close();
    });
  });
}

if (process.argv.length === 2) {
  mongoose.connect(url, { family: 4 }).then(() => {
    Person.find({})
      .then(persons => {
        console.log("Phonebook: ");
        for (const person of persons) {
          console.log(`${person.name} ${person.number}`);
        }
        mongoose.connection.close();
      });
  });
}