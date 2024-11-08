import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
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
    setPersons(persons.concat(nameObj))
    console.log("clicked button");
  }


  return (
    <div>
      <h2>Phonebook</h2>
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
          <li key={person.name}>{person.name} {person.number}</li>
        )}
    </div>
  )
}

export default App