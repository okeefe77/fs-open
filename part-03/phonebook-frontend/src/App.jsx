import { useState, useEffect } from 'react';
import personService from './services/persons';
import { SuccessMessage, ErrorMessage } from './components/Notification';

function Entry({ person: { id, name, number }, handleClick }) {
  return (
    <li key={id}><strong>{name}</strong> {number} <button onClick={handleClick}>💣</button></li>
  )
}

function Listing({ persons, setPersons, filterText, setSuccessMessage, setErrorMessage }) {
  const removeListing = id => {
    setPersons(persons.filter(person => person.id !== id))
  };

  const makeDeleteHandler = p => {
    return () => {
      if (confirm(`Delete ${p.name}?`)) {
        personService.remove(p.id)
          .then(data => removeListing(data.id))
          .then(() => setSuccessMessage(`Entry for ${p.name} removed`))
          .catch(() => {
            removeListing(p.id);
            setErrorMessage(`Entry for ${p.name} was already removed from the server`);
          });
      }
    }
  }

  return (
    <ul>
      {persons
        .filter(person => person.name.toLowerCase().indexOf(filterText) >= 0)
        .sort((a, b) => a.name.split(' ')[1].localeCompare(b.name.split(' ')[1]))
        .map(person =>
          <Entry key={person.id} person={person} handleClick={makeDeleteHandler(person)} />
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

function Directory({ persons, setPersons, setSuccessMessage, setErrorMessage }) {
  const [filterText, setFilterText] = useState('');

  return (
    <div>
      <h2>Numbers</h2>
      <Filter filterText={filterText} setFilterText={setFilterText} />
      <Listing
        persons={persons}
        filterText={filterText}
        setPersons={setPersons}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
}

function NewEntryForm({ persons, setPersons, setSuccessMessage }) {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNewNameChange = event => setNewName(event.target.value);
  const handleNewNumberChange = event => setNewNumber(event.target.value);

  const addEntry = event => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber
    };

    if (persons.some(person => person.name === newPerson.name)) {
      if (confirm(`${newName} is already in the phonebook. Replace the old number?`)) {
        const oldPerson = persons.find(person => person.name === newPerson.name);
        const updatedPerson = { ...oldPerson, number: newNumber };
        personService.update(updatedPerson)
          .then(data => {
            setPersons(persons.filter(person => person.id !== data.id).concat(updatedPerson))
          })
          .then(() => setSuccessMessage(`Number for ${updatedPerson.name} updated successfully`))
          .then(() => {
            setNewName('');
            setNewNumber('');
          })
      }
    } else {
      personService.create(newPerson)
        .then(data => setPersons(persons.concat(data)))
        .then(() => setSuccessMessage(`Entry added for ${newPerson.name}`))
        .then(() => {
          setNewName('');
          setNewNumber('');
        })
    }
  }

  return (
    <div>
      <h2>Add New Entry</h2>
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
    </div>
  );
}

function App() {
  const [persons, setPersons] = useState([]);
  const [successMessage, setSuccessMessage] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    personService.getAll()
      .then(data => setPersons(data));
  }, []);

  const notifySuccess = message => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(undefined), 3000);
  }

  const notifyError = message => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(undefined), 4000);
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <SuccessMessage message={successMessage} />
      <ErrorMessage message={errorMessage} />
      <NewEntryForm persons={persons} setPersons={setPersons} setSuccessMessage={notifySuccess} />
      <Directory
        persons={persons}
        setPersons={setPersons}
        setSuccessMessage={notifySuccess}
        setErrorMessage={notifyError}
      />
    </div>
  )
}

export default App
