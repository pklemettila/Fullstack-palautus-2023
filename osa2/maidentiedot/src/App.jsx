import {useState, useEffect} from "react";
import axios from 'axios'
import CountryFinder from "./components/CountryFinder.jsx";
import CountryLister from "./components/CountryLister.jsx";


const App = () => {

    const [countryFilter, setCountryFilter] = useState('')
    const [allCountries, setAllCountries] = useState([])


    useEffect(() => {
        axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
            .then(response => {
                setAllCountries(response.data)
            })
    }, [])

    const handleFilterChange = (event) => {
        setCountryFilter(event.target.value)
    }

    const toggleShow = (countryToShow) => {
        setCountryFilter(countryToShow)
    }

    const filteredCountries = allCountries.filter(
        country => country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
    )


    return (
        <div>
        <CountryFinder countryFilter={countryFilter} handleFilterChange={handleFilterChange}/>
        <CountryLister filteredCountries={filteredCountries} toggleShow={toggleShow}/>
        </div>

    )
}
export default App
