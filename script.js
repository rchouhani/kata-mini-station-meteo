const cityInput = document.querySelector('#cityInput')
const buttonValidate = document.querySelector('button')
const h1 = document.querySelector('#city')
const getGPS = document.querySelector('#gps')
const temperature = document.querySelector('#temperature')
const details = document.querySelector('#details')



async function fetchCoordinateData(query){
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=1`);
    const data = await response.json();
    console.log("😎😎", data)
    return data
}

async function fetchWeather(latitude, longitude){
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,relative_humidity_2m`)
    const data = await response.json()
    console.log('🪷🪷🪷', data)
    return data
}

buttonValidate.addEventListener('click', async function(){
    h1.innerText = cityInput.value
    const ville = await fetchCoordinateData(cityInput.value)
    
    const lati = ville[0].lat;
    const longi = ville[0].lon;

    if(ville.length){
        getGPS.innerText = `Coordonnées GPS = ${lati}, ${longi}`
    } else {
        getGPS.innerText = "Bad News"
    }

    const temp = await fetchWeather(lati, longi) 
    temperature.innerText =  `${temp.current.temperature_2m}°C`
    console.log("🙄🙄")

    details.innerText = "Température Actuelle"
})