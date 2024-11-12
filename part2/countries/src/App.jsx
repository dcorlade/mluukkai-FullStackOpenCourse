import { useEffect, useState } from 'react'
import axios from 'axios'
import CountryDetails from './components/CountryDetails'

const App = () => {
  const [countries, setCountries] = useState(null)
  const [newFilter, setNewFilter] = useState('')
  const [showCountry, setShowCountry] = useState(null)

  useEffect(() => {
    const promise = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    promise.then(
      response => {
        console.log('Getting the countries...')
        setCountries(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  if (!countries)
    return null


  const handleFilterChange = (event) => {
    setShowCountry(null)
    setNewFilter(event.target.value)
  }

  const filteredCountries = newFilter
    ? countries.filter((country) => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
    : countries;

  const handleShowCountry = (name) => {
    const promise = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
    promise.then(response => {
      setShowCountry(response.data)
    })
    console.log('Country is shown')
  }

  return (
    <div> 
      <form>
        <label>find countries </label>
        <input
          value={newFilter}
          onChange={handleFilterChange}
        />
      </form>
      {filteredCountries.length == 1 ?
      (
        <CountryDetails countryShow={filteredCountries[0]}/>
      )
      :
      (filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        filteredCountries.map(country => 
          <div key={country.name.common}>
            {country.name.common}
            <button style={{ marginLeft: '10px' }} onClick={() => handleShowCountry(country.name.common)}>
              show
            </button>
          </div>
        )
      ))}
      {showCountry && <CountryDetails countryShow={showCountry} />}
    </div>
  );
}

export default App