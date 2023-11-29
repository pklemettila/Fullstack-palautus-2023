import React from 'react'

const CountryFinder = ({countryFilter, handleFilterChange}) =>{

    return (
        <div>
            find countries <input value={countryFilter} onChange={handleFilterChange}/>
        </div>
    )

}

export default CountryFinder