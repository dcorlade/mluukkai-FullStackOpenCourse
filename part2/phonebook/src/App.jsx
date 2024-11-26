// @ts-nocheck
import { useEffect, useState } from 'react'
import personService from './services/persons'
import Notification from './components/Notifcation'
import Person from './components/Person'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'

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
      personService.remove(id)
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
    const newObj = {
      name: newName,
      number: newPhone
    }
    
    if (personNames.includes(newObj.name)) {
      alert(`${newObj.name} is already added to the phonebook, the number will be updated`)
      
      const personToUpdate = persons.find(person => person.name === newObj.name)
      personService.update(personToUpdate.id, newObj)
      .then(person => {
        setPersons(persons.map(n => n.id === personToUpdate.id ? person : n))
      })
      .catch(error => {
        alert(
          `the person '${personToUpdate.name}' was already deleted from server`
        )
        setPersons(persons.filter(n => n.id !== id))
      })
      return
    }

    personService.create(newObj).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewPhone('')
    })
    .catch(error => {
      setNotifMessage(`${error.response.data.error}`)
      setTimeout(() => {
        setNotifMessage(null);
      }, 5000);
      console.log(error.response.data.error)
    })
    
    console.log("clicked button");

    setNotifMessage(
      `Added '${newObj.name}'`
    )
    setTimeout(() => {
      setNotifMessage(null)
    }, 5000)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} type={notifMessage && (notifMessage.includes('deleted') || notifMessage.includes('failed')) ? 'error' : 'success'} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <br></br>
      <AddPerson 
        newName={newName} 
        newPhone={newPhone} 
        handleNameChange={handleNameChange} 
        handlePhoneChange={handlePhoneChange} 
        addPerson={addPerson} 
      />
      <h2>Numbers</h2>
      
        {(newFilter ? 
          persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))
          :
          persons
        ).map(person =>
          <Person key={person.id} person={person} deletePerson={deletePerson} />
        )}
    </div>
  )
}

export default App