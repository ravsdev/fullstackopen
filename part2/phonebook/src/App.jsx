import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const MSG_NOTIFICATION = 'notification';
const MSG_ERROR = 'error';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [message, setMessage] = useState(null);
  const [messageClass, setMessageClass] = useState('notification');

  useEffect(() => {
    personService.getAll().then((data) => setPersons(data));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const exists = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (exists !== undefined) {
      //alert(`${newName} is already added to phonebook`);
      const { id } = exists;
      const confirmUpdate = window.confirm(
        `${personObject.name} is already added to phonebook, replace the old number with the new one?`
      );
      if (confirmUpdate) {
        personService
          .update(id, personObject)
          .then((data) => {
            setPersons(
              persons.map((person) => (person.id != id ? person : personObject))
            );
            setMessage(`${newName} was updated`);
            setMessageClass(MSG_NOTIFICATION)
            setTimeout(() => {
              setMessage(null);
            }, 3000);
            setPersons(persons.filter((person) => person.id !== id));
          })
          .catch((error) => {
            setMessage(`${newName} was already deleted from server`);
            setMessageClass(MSG_ERROR)
            setTimeout(() => {
              setMessage(null);
            }, 3000);
            setPersons(persons.filter((person) => person.id !== id));
          });
      }
    } else {
      personService
        .create(personObject)
        .then((data) => {
          setPersons(persons.concat(data));
          setMessage(`Added ${data.name}`);
          setMessageClass(MSG_NOTIFICATION)
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        })
        .catch(error => {
          setMessage(error.response.data.error);
          setMessageClass(MSG_ERROR)
          setTimeout(() => {
            setMessage(null);
          }, 3000);
         // console.log()
        });
    }

    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value);
  };

  const handleClickRemove = (id) => {
    const person = persons.find((p) => p.id === id);
    const confirmRemove = window.confirm(`Delete ${person.name}?`);
    if (confirmRemove) {
      personService
        .remove(id)
        .then((response) => {
          const filterPersons = persons.filter((person) => person.id !== id);
          setPersons(filterPersons);
          setMessage(`${person.name} was deleted`);
          setMessageClass(MSG_NOTIFICATION)
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        })
        .catch((error) => {
          //alert(`the person '${person.name}' was already deleted from server`);
          setMessage(`${person.name} was already deleted from server`);
          setMessageClass(MSG_ERROR)
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        });
    }
  };

  const personsToShow =
    filterName === ""
      ? persons
      : persons.filter(({ name }) =>
        name.toLowerCase().includes(filterName.toLowerCase())
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} style={messageClass} />
      <Filter
        filterName={filterName}
        handleFilterNameChange={handleFilterNameChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleClickRemove={handleClickRemove} />
    </div>
  );
};

export default App;
