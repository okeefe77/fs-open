import { useState } from 'react';

function Entry({ person: { id, name, number } }) {
  return (
    <li key={id}><strong>{name}</strong> {number}</li>
  )
}

function Listing({ persons, filterText }) {
  return (
    <ul>
      {persons.filter(
        person => person.name.toLowerCase().indexOf(filterText) >= 0).map(person =>
          <Entry key={person.id} person={person} />
        )}
    </ul>
  )
}

function Filter({ filterText, setFilterText }) {
  const handleFilterTextChange = event => {
    setFilterText(event.target.value);
  }

  return (
    <div>
      <label>Filter by name: </label>
      <input type="text" onChange={handleFilterTextChange} value={filterText} />
    </div>
  );
}

function Directory({ persons }) {
  const [filterText, setFilterText] = useState('');

  return (
    <div>
      <h2>Numbers</h2>
      <Filter filterText={filterText} setFilterText={setFilterText} />
      <Listing persons={persons} filterText={filterText} />
    </div>
  );
}

function NewEntryForm({ persons, setPersons }) {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNewNameChange = event => setNewName(event.target.value);
  const handleNewNumberChange = event => setNewNumber(event.target.value);

  const addEntry = event => {
    event.preventDefault();

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} has already been added to the directory`);
    } else {
      setPersons(persons.concat({
        id: persons.length + 1,
        name: newName,
        number: newNumber
      }));

      setNewName('');
      setNewNumber('');
    }
  }

  return (
    <form onSubmit={addEntry}>
      <div>
        <label>Name: </label>
        <input value={newName} onChange={handleNewNameChange} />
      </div>
      <div>
        <label>Number: </label>
        <input value={newNumber} onChange={handleNewNumberChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}

function App() {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);

  return (
    <div>
      <h1>Phonebook</h1>
      <NewEntryForm persons={persons} setPersons={setPersons} />
      <Directory persons={persons} />
    </div>
  )
}

export default App
