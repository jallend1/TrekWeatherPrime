const ul = document.querySelector('ul');
const li = document.querySelectorAll('li');
const place = document.querySelector('#place');
const logo = document.querySelector('#logo');
const temp = document.querySelector('#temp');
const conditionDescription = document.querySelector('#conditions')
const nets = document.querySelector('#nets');
const ferengiRain = ["Rainy", "Misty", "Downpour", "Soggy", "Dripping", "Drizzling", "Moist", "Pouring", "Soaking", "Sopping", "Clammy", "Waterlogged", "Wet", "Damp"]

const updatePlace =  (newCity) => {
    place.textContent = newCity;
    logo.setAttribute('src', `images/${newCity}.jpg`);
    logo.setAttribute('alt', `The logo for ${newCity}`);
    getTemp(newCity)
        .then(data => {
            if(newCity === "Vulcan" && data.temp < 25){data.temp += 15;}                                    // Vulcan is never chilly
            temp.innerHTML = `Current Temperature: ${data.temp}&deg C `;                                    // Updates page with current temp
            if(newCity === "Ferenginar") {                                                                  // Keeps Ferenginar Rainy
                const rainModifier = Math.floor(Math.random() * ferengiRain.length);
                conditionDescription.innerText = `Current Conditions: ${ferengiRain[rainModifier]}`;     
            }
            else {conditionDescription.innerHTML = `Current Conditions: ${data.description}`}
            if((newCity === "Federation") || (newCity === "Starfleet")){earth(data);}                       // Activates Weather Modification Nets
        })
            .catch(err => console.log(err));
}

const earth = (weather) => {                                                                                // If clear, Weather Nets work. 
    nets.classList.remove('hide');                                                                          // Otherwise displays error
    if(weather.description.includes('Clear')){
        nets.classList.remove('warning');
        nets.textContent = "(Weather Modification Nets fully operational)";
    }
    else{
        nets.textContent = "(Weather Modification Nets currently offline)"
        nets.classList.add('warning');
    }
}

ul.addEventListener('click', e => {
    if(e.target.tagName === 'LI'){
        temp.innerText = "Current Temperature: ::Accessing::";
        conditionDescription.innerText = "Current Conditions: :: Accessing::";
        nets.classList.add('hide');                                                                         // Removes Weather Nets in case we're transitioning off-world
        li.forEach(listItem => listItem.classList.remove('highlighted'));                                   // Removes current highlighted menu
        e.target.classList.add('highlighted');
        updatePlace(e.target.innerText)}
});

updatePlace("Starfleet");