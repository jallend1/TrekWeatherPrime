const ul = document.querySelector('ul');
const place = document.querySelector('#place');
const logo = document.querySelector('#logo');
const temp = document.querySelector('#temp');

const updatePlace = async (newCity) => {
    place.textContent = newCity;
    logo.setAttribute('src', `images/${newCity}.jpg`);
    logo.setAttribute('alt', `The logo for ${newCity}`);
    let currentTemp = await getTemp(newCity)
    temp.innerText = await currentTemp;
}

ul.addEventListener('click', e => {
    if(e.target.tagName === 'LI'){
        updatePlace(e.target.innerText)}
});

let currentWeather = updatePlace("Starfleet");