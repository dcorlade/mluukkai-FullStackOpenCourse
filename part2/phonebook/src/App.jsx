// @ts-nocheck
import { useEffect, useState } from 'react'
import personService from './services/persons'
import Notification from './components/Notifcation'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notifMessage, setNotifMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personNames = persons.map(person => person.name)

  const deletePerson = (id) => {
    
    const personToDelete = persons.find(person => person.id === id)
    console.log("deleting " + id)
    if (confirm(`Delete ${personToDelete.name} ?`)) {
      personService.remove(id, personToDelete)
        .then(returnedPersons => {
          console.log("returning: ", returnedPersons)
          const newPersons = persons.filter(person => person.id != id)
          setPersons(newPersons)
        })
        .catch(err => {
          setNotifMessage(`Information of ${personToDelete.name} was already deleted from server `)
          setTimeout(() => {
            setNotifMessage(null);
          }, 5000);
          setPersons(persons.filter(person => person.id !== id))

        }
        )
      console.log('Person was deleted.');
    } else {
      // Do nothing!
      console.log('Person wasn\'t deleted.');
    }
    
  }

  const addPerson = (event) => {
    event.preventDefault()
    const nameObj = {
      name: newName,
      number: newPhone
    }
    
    if (personNames.includes(nameObj.name)) {
      console.log("added")
      alert(`${newName} is already added to the phonebook`)
      return
    }

    personService.create(nameObj).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewPhone('')
    })
    
    console.log("clicked button");

    setNotifMessage(
      `Added '${nameObj.name}'`
    )
    setTimeout(() => {
      setNotifMessage(null)
    }, 5000)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} type={notifMessage && notifMessage.includes('deleted') ? 'error' : 'success'} />
      <form >
        <label>filter on name:</label>
        <input
          value={newFilter}
          onChange={handleFilterChange}
        />
      </form> 
      <br></br>
      <form onSubmit={addPerson}>
        <label>name: </label>
        <input
          value={newName}
          onChange={handleNameChange}
        />
        <br></br>
        <label>phone: </label>
        <input
          value={newPhone}
          onChange={handlePhoneChange}
        />
        <br></br>
        <button type="submit">add</button>
      </form> 
      <h2>Numbers</h2>
      
        {(newFilter ? 
          persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))
          :
          persons
        ).map(person =>
          <div key={person.name}>
            
            <li>{person.name} {person.number}</li>
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </div>
          
        )}
    </div>
  )
}

export default App