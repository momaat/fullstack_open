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

    // Add name only if it doesn't already exist, otherwise make an alert
    if (nameExists) {
        alert(`${newName} is already added to phonebook`) 
    } else {
        const personObject = { name: newName, number: newNumber };
        
        personService
        .create(personObject)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(personObject));
          setNewName('')
          setNewNumber('')
        })
    }
  }

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