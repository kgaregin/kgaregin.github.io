const cities = {
    Hamburg: {
        latitude: 53.55,
        longitude: 9.99,
        timeZone: "Europe%2FBerlin",
    }
}

const getForecastUrlForCity = (
    {
        latitude,
        longitude,
        timeZone = "Europe%2FBerlin",
    }
) => `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=${timeZone}`

const getDailyForecast = (data) => {
    const forecast = {}
    const dates = data.daily.time
    const maxTemperatures = data.daily.temperature_2m_max
    const minTemperatures = data.daily.temperature_2m_min

    for (let i = 0; i < dates.length; i++) {
        forecast[dates[i]] = {
            maxTemperature: maxTemperatures[i],
            minTemperature: minTemperatures[i],
        }
    }

    return forecast
}

const displayData = (data) => {
    const dates = Object.keys(data)
    const dateElements = document.querySelectorAll('.date')
    const minTemperatureElements = document.querySelectorAll('.min-temperature')
    const maxTemperatureElements = document.querySelectorAll('.max-temperature')

    for (let i = 0; i < dateElements.length; i++) {
        const date = dates[i]
        const minTemperature = data[date].minTemperature
        const maxTemperature = data[date].maxTemperature

        dateElements[i].innerText = date
        minTemperatureElements[i].innerText = minTemperature
        maxTemperatureElements[i].innerText = maxTemperature
    }
}


const fetchHamburgData = () => fetch(getForecastUrlForCity(cities.Hamburg))
    .then(response => response.json())
    .then(getDailyForecast)
    .then(displayData)

const fetchForecast = () => {
    fetchHamburgData()
}
