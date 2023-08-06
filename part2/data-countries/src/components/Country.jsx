import { useState, useEffect } from "react";
import Weather from "./Weather";

const Country = ({data}) => {
    const {name,capital, cca2, flags, population, languages} = data;

    return (
        <div>
            <h2>{name.common}</h2>
            <p>capital {capital}</p>
            <p>population {population}</p>
            <h3>languages</h3>
            <ul>
                {Object.values(languages).map((language, id)=><li key={id}>{language}</li>)}
            </ul>
            <img src={flags['png']} alt={flags['alt']}/>
            <Weather capital={capital} cca2={cca2} />
        </div>
    )
}

export default Country