import { useState } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import { useEffect } from 'react'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('notification')

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

      confirm(`${newName} is already added to phonebook,replace the old number with a new one?`) 
        ? personService
          .update(updateId, changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== updateId ? person : response.data))
            
            // show notification
            setNotification(`${changedPerson.name}'s number changed`)
            setNotificationType('notification')

            setTimeout(() => {
              setNotification(null)
            }, 3000)
          })
          .catch(error => {
            setNotification(`Information of ${changedPerson.name} has already been removed from server`)
            setNotificationType('error')

            setTimeout(() => {
              setNotification(null)
            }, 3000)
          })
        : ""

    // else create a new person
    } else {
      const personObject = { name: newName, number: newNumber };
      
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data));

          // show notification
          setNotification(`Added ${newName} to phonebook`)
          setNotificationType('notification')

          setTimeout(() => {
            setNotification(null)
          }, 3000)
        })
        .catch(error => {
          console.log(error.response.data)
          setNotification((error.response.data.error))
          setNotificationType('error')

          setTimeout(() => {
            setNotification(null)
          }, 3000)
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

        // show notification
        setNotification(`${persons.find(person => person.id == id).name} removed from phonebook`)

        setTimeout(() => {
          setNotification(null)
        }, 3000)
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

      <Notification message={notification} messageType={notificationType}/>

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