const API_KEY = "162f7a8ff3d78517ff231e95d9ce02d5"

const makeIconURL = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`


const getFormattedWeatherData = async (city, units = 'metric') => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
    const data = await fetch(url)
        .then((res) => res.json())
        .then((data) => data)

    const {weather,
        main:{temp, feels_like, temp_min, temp_max, pressure, humidity},
        wind: {speed},
        sys: {country},
        name
    } = data;

    const {description, icon} = weather[0];

    return {
        description,
        iconURL: makeIconURL(icon), 
        temp, 
        feels_like, 
        temp_min, 
        temp_max, 
        pressure, 
        humidity, 
        speed, 
        country, 
        name,
    }
}



export {getFormattedWeatherData};