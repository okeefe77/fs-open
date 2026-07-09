import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Search = ({ countryData, setCountryList }) => {
  const searchText = useRef('');

  const handleSearchTextChange = event => {
    const input = event.target.value;
    if (input && input !== '' && countryData.length) {
      setCountryList(
        countryData
          .filter(c => c.name.common.toLowerCase().includes(input))
          .sort((a, b) => a.name.common.toLowerCase().localeCompare(b.name.common.toLowerCase()))
      )
    }
  }

  return (
    <div style={{ marginBottom: '1.5em' }}>
      <label>Country search:</label>
      <input type="text" ref={searchText} onChange={handleSearchTextChange} />
    </div>
  )
}

const CountryListItem = ({ country, setCountryList }) => {
  const handleCountryNameClick = () => {
    setCountryList([{ ...country }]);
  }

  const linkStyledButton = {
    border: 'none',
    background: 'none',
    fontFamily: 'inherit',
    fontSize: '1.15rem',
    textDecoration: 'underline',
    color: 'blue',
    cursor: 'pointer'
  }

  return (
    <li key={country.cca3}>
      <button style={linkStyledButton} onClick={handleCountryNameClick}>{country.name.common}</button>
    </li>
  );
}

const CountryList = ({ countries, setCountryList }) => {
  if (countries.length > 10) {
    return (<p>Too many countries to display. Please search to narrow the list.</p>);
  } else {
    return (
      <ul>
        {countries.map(c => <CountryListItem key={c.cca3} country={c} setCountryList={setCountryList} />)}
      </ul>
    );
  }
}

const WeatherInfo = ({ country }) => {
  const api_key = import.meta.env.VITE_WEATHER_KEY;
  const capital = country.capital[0];
  const [lat, lon] = country.capitalInfo.latlng;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${api_key}`

  const [weatherData, setWeatherData] = useState(undefined);

  useEffect(() => {
    axios.get(weatherUrl)
      .then(response => setWeatherData(response.data));
  })

  if (weatherData) {
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <h4>{weatherData.weather[0].description}</h4>
        <img
          alt={weatherData.weather[0].description}
          src={`https://openweathermap.org/payload/api/media/file/${weatherData.weather[0].icon}.png`}
        />
        <dl>
          <dt>Temperature</dt>
          <dd>{weatherData.main.temp}° C</dd>
          <dt>Wind</dt>
          <dd>{weatherData.wind.speed} m/s</dd>
        </dl>
      </div>
    )
  }
}

const CountryInfo = ({ country }) => {
  return (
    <div>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>{country.name.common}</h2>
      <dl>
        <dt>Capital</dt>
        <dd>{country.capital[0]}</dd>

        <dt>Population</dt>
        <dd>{country.population}</dd>

        <dt>Area</dt>
        <dd>{country.area}</dd>

        <dt>Spoken Languages</dt>
        <dd>
          <ul>
            {Object.keys(country.languages).map(lang => <li key={lang}>{country.languages[lang]}</li>)}
          </ul>
        </dd>
      </dl>
      <WeatherInfo country={country} />
    </div>
  )
}

const Display = ({ countryList, setCountryList }) => {
  if (countryList.length === 1) {
    return (<CountryInfo country={countryList[0]} />)
  } else {
    return (<CountryList countries={countryList} setCountryList={setCountryList} />)
  }
}

const App = () => {
  const [countryData, setCountryData] = useState([]);
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountryData(response.data));
  }, [])

  return (
    <>
      <Search countryData={countryData} setCountryList={setCountryList} />
      <Display countryList={countryList} setCountryList={setCountryList} />
    </>
  )
}

export default App
