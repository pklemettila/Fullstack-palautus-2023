import {useState, useEffect} from "react";
import axios from "axios";

const CountryLister = ({filteredCountries, toggleShow}) => {



    const [capitalWeather, setCapitalWeather] = useState()
    const api_key = import.meta.env.VITE_SOME_KEY
    const singleCountry = filteredCountries[0]


   useEffect(() => {
       if (filteredCountries.length === 1)
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${singleCountry.latlng[0]}&lon=${singleCountry.latlng[1]}&appid=${api_key}&units=metric`)
            .then(response => {
                console.log(response.data)
                setCapitalWeather(response.data)
                }
            )
          }, [filteredCountries])

    if (filteredCountries.length > 10 || filteredCountries.length === 0) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
        return (
            <div>
                {filteredCountries.map(country =>
                    <div key={country.name.common}>
                        {country.name.common} <button onClick={() => toggleShow(country.name.common)}>show</button>
                    </div>)
                }
            </div>
        )
    } else if (filteredCountries.length === 1 && capitalWeather) {
        return(
            <div>
                <h1>{singleCountry.name.common}</h1>
                <p>capital {singleCountry.capital}</p>
                <p>area {singleCountry.area}</p>
                <h2>Languages</h2>
                <ul>
                    {Object.values(singleCountry.languages).map(language =>
                        <li key={language}>{language}</li>)}
                </ul>
                <img src={singleCountry.flags.png}/>
                <h2>Weather in {singleCountry.capital} celsius</h2>
                <p>temperature {capitalWeather.main.temp}</p>
                <img src={`https://openweathermap.org/img/wn/${capitalWeather.weather[0].icon}@2x.png`}/>
                <p>wind {capitalWeather.wind.speed} m/s</p>
            </div>
        )
    }

}
export default CountryLister