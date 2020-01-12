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
            if(newCity === "Vulcan" && data.temp < 25){data.temp += 15;} // Vulcan is never chilly
            temp.innerHTML = `Current Temperature: ${data.temp}&deg C `;       // Updates page with current temp
            if(newCity === "Ferenginar") {                     // Keeps Ferenginar Rainy
                const rainModifier = Math.floor(Math.random() * ferengiRain.length);
                conditionDescription.innerText = `Current Conditions: ${ferengiRain[rainModifier]}`;     
            }
            else {conditionDescription.innerHTML = `Current Conditions: ${data.description}`}
            
            // ** Weather Nets Only Available on Earth ** 
            (data.description.includes('Clear') && (newCity === "Starfleet" || newCity === "Federation") )
                ? nets.classList.remove('hide') 
                : nets.classList.add('hide');
            })
            .catch(err => console.log(err));
}

ul.addEventListener('click', e => {
    if(e.target.tagName === 'LI'){
        
        temp.innerText = "Current Temperature: ::Accessing::";
        conditionDescription.innerText = "Current Conditions: :: Accessing::";
        nets.classList.add('hide'); // Removes Weather Nets in case we're transitioning off-world
        li.forEach(listItem => listItem.classList.remove('highlighted'));
        e.target.classList.add('highlighted');
        updatePlace(e.target.innerText)}
});

updatePlace("Starfleet");