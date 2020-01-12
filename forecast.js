const endPoints = {
    Starfleet: "https://api.weather.gov/stations/KSFO/observations",
    Vulcan: "https://api.weather.gov/stations/KPHX/observations",
    Federation: "https://api.weather.gov/stations/KSJC/observations",
    Ferenginar: "https://api.weather.gov/stations/KNEW/observations"
}

getTemp = async (updateLocation) => {
    let response = await fetch(endPoints[updateLocation]);
    let data = await response.json();
    let temp = Math.round(data.features[0].properties.temperature.value); 
    let description = data.features[0].properties.textDescription;
    return {temp, description};
};