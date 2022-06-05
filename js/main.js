import {apiKey, url} from "./WeatherApi.js";

let inputlocation = document.querySelector('.input-location');
const submitBtn = document.querySelector('.submit-location');
const usersBtn = document.querySelector('.users-location');
const box1 = document.querySelector('.box1');
const location = document.querySelector('.location');
const temp = document.querySelector('.temp-c');
const conditionIcon = document.querySelector('.condition-icon');
const conditionText = document.querySelector('.condition-text');

async function Weather() {
    try {
        const response = await fetch(
            `${url}current.json?key=${apiKey}&q=${inputlocation.value}`
        );
        const data = await response.json();
        console.log(data);

        location.textContent = data.location.name;
        temp.textContent = data.current.temp_c + '°C';
        conditionIcon.src = data.current.condition.icon;
        conditionText.textContent  = data.current.condition.text;
           
        conditionIcon.classList.add('icon');
        box1.classList.add('weather-box');
        inputlocation.value = "";   
    }
    catch (e) {
        alert("Enter a valid location or the api doesn't work");
        console.log(e);
    }
} 

submitBtn.addEventListener('click', Weather);

function UsersLocation() {
   async function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        try {
            const response = await fetch(
                `${url}current.json?key=${apiKey}&q=${latitude},${longitude}`
            );
            const data = await response.json();
            console.log(data);

            location.textContent = data.location.name;
            temp.textContent = data.current.temp_c + '°C';
            conditionIcon.src = data.current.condition.icon;
            conditionText.textContent  = data.current.condition.text;
               
            conditionIcon.classList.add('icon');
            box1.classList.add('weather-box');
            inputlocation.value = "";
        }
        catch (e) {
            alert("The api doesn't work");
            console.log(e);
        }
    }

    function error() {
        alert('Unable to retrieve your location');
    }
    
    if(!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
    }
    else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

usersBtn.addEventListener('click', UsersLocation);
