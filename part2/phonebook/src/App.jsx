import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')


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