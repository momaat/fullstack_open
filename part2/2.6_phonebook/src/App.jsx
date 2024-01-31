import { useState } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { useEffect } from 'react'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then (response => {
        setPersons(response.data)
      })
  
  }, [])

  // Add a new person to persons list
  const addPerson = (event) => {
    event.preventDefault()
    
    // Check if name already exists in the list
    const nameExists = persons.some(person => person.name === newName);

    // If name exists, update number
    if (nameExists) {
      const updatePerson = persons.find(person => person.name === newName)
      const updateId = updatePerson.id;
      const person = persons.find(person => person.id === updateId)
      const changedPerson = {...person, number: newNumber}

      console.log(updateId + 'updateID')
      confirm(`${newName} is already added to phonebook,replace the old number with a new one?`) 
        ? personService
          .update(updateId, changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== updateId ? person : response.data))
          })
          
        : ""

    // else create a new person
    } else {
      const personObject = { name: newName, number: newNumber };
      
      personService
        .create(personObject)
        .then(response => {
        setPersons(persons.concat(response.data));
      })
    }

    setNewName('')
    setNewNumber('')
  }

  // Remove person from the persons list
  const handleDeletePerson = (id) => {
    personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
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
        deletePerson = {handleDeletePerson}
      />
      
    </div>
  )
}

export default App