import { useState, useEffect } from "react";
import weatherService from '../services/weather';

const Weather = ({capital,cca2}) => {
    const [weather, setWeather] = useState({});
    const [icon, setIcon] = useState("");
    
    useEffect(() => {
        weatherService.getLatLon(capital,cca2).then((data)=>{
            const {lat, lon} = data[0];
            weatherService.getWeather(lat,lon).then((data)=>{
                const {weather, main, wind} = data
                setIcon(`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`)
                setWeather({
                    temp: main.temp,
                    wind: wind.speed
                })
              console.log(weather[0].icon,main.temp,wind.speed) 
            });
        })
      }, [capital]);

      return (
        <>
            <h2>Weather in {capital}</h2>
            <p>temperature {weather.temp} Celsius</p>
            <img src={icon}></img>
            <p>wind {weather.wind} m/s</p>
        </>
      )
}

export default Weather