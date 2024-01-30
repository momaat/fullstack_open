import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0401234567'},
    { name: 'Ada Lovelace', number: '040322245435'},
    { name: 'Dan Abramov', number: '0309298484'},
    { name: 'Mary Poppendieck', number: '94939949349'},
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // Add a new person to persons list
  const addPerson = (event) => {
    event.preventDefault()
    
    // Check if name already exists in the list
    const nameExists = persons.some(person => person.name === newName);

    // Add name only if it doesn't already exist, otherwise make an alert
    if (nameExists) {
        alert(`${newName} is already added to phonebook`) 
    } else {
        const personObject = { name: newName, number: newNumber };
        setPersons(persons.concat(personObject));
    }

    // Clear name and number fields
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  // Filter the persons to be shown based on filter input
  const filteredPersons = filter === '' ? persons : persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filter} onChange={handleFilterChange}/>
     
      <h3>Add a new name and number</h3>
      
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      
      <h3>Numbers</h3>

      <Persons 
        filteredPersons = {filteredPersons}
      />
      
    </div>
  )
}

export default App