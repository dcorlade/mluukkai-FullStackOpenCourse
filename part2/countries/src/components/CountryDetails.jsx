import React from 'react';

const CountryDetails = ({ countryShow }) => {
  return (
    <div>
        <h1>{countryShow.name.common}</h1>
        <p>capital {countryShow.capital}</p>
        <p>area {countryShow.area}</p>
        <br></br>
        <h3>languages:</h3>
        <div>
        {Object.keys(countryShow.languages).map(lan => (
          <li key={lan} style={{ paddingLeft: '30px' }}>
            {countryShow.languages[lan]}
          </li>
        )
        )}
        </div>
        <br></br>
        <img src={countryShow.flags.png} alt={countryShow.flags.alt} style={{ width: '200px', height: 'auto' }} />
        
    </div>
  );
};

export default CountryDetails