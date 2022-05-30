'use strict';

const btn = document.querySelector('#btn'),
      input = document.querySelector('#userInput'),
      body = document.querySelector('body'),
      currentTemp = document.querySelector('#currentTemp'),
      cityName = document.querySelector('#cityName'),
      currentTime = document.querySelector('#currentTime'),
      currentDate = document.querySelector('#currentDate'),
      weatherIcon = document.querySelector('.main-wrapper__weather-icon'),
      weatherIndexes = document.querySelector('.main-wrapper__weather-indexes'),
      visualBlock = document.querySelector('.main-wrapper__weather-visual');

let data,
    photo;


function timeConverter(UNIXtimestamp, selector){
    let a = new Date(UNIXtimestamp * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let dateNow = date + ' ' + month + ' ' + year;
    let time = hour + ':' + min;

    if (selector == 'time') {
        return time;
    } else {
        return dateNow;
    }
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
    }



function insertValue() {
    cityName.innerText = `${data.name}`;
    currentTime.innerText = `${timeConverter(data.dt, 'time')}`;
    currentDate.innerText = `${timeConverter(data.dt, 'date')}`;
    currentTemp.innerHTML = `${Math.round(data.main.temp - 273.15)}&degC`;
    weatherIcon.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon"></img>
    <p id="weatherDescr">${data.weather[0].description}</p>
    `;

    weatherIndexes.innerHTML = `
    <div class="index">
        <div>Current temp: </div>
        <div>${Math.round(data.main.temp - 273.15)} &degC</div>
    </div>

        <span></span>

    <div class="index">
        <div>Current pressure: </div>
        <div>${Math.round(data.main.pressure * 0.75006375541921)} mmHg</div>
    </div>

        <span></span>

    <div class="index">
        <div>Current humidity: </div>
        <div>${Math.round(data.main.humidity)} %</div>
    </div>

        <span></span>

    <div class="index">
        <div>Min temperature: </div>
        <div>${Math.round(data.main.temp_min - 273.15)} &degC</div>
    </div>

        <span></span>

    <div class="index">
        <div>Max temperature: </div>
        <div>${Math.round(data.main.temp_max - 273.15)} &degC</div>
    </div>
    `;
}


function collectData(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=c399362e0b13104407ba21b549d95547`)
        .then(response => {
        data = response.json();
        return data;
        })
        .then(result => {
            data = result;
            return data;
        })
        .then(() => {
            insertValue();
        })
        .catch(() => {
            console.log('Сталась помилка. Наші котики вже працюють над цим');
        });

    fetch(`https://api.unsplash.com/search/photos?client_id=qN4OKFJMhjsIhlHWXBftZ2Pdasy9WLvSQ3NAVZ7bslo&?page=1&query=${cityName}`)
        .then(response => {
        photo = response.json();
        return photo;
        })
        .then(result => {
            photo = result;
            return photo;
        })
        .then(() => {
            console.log(photo);
            if (document.documentElement.clientWidth < 768) {
                weatherIcon.style.cssText = `background: no-repeat center / cover url(${photo.results[randomInteger(0, 9)].urls.regular})`;
            } else {
                visualBlock.style.cssText = `background: no-repeat center / cover url(${photo.results[randomInteger(0, 9)].urls.regular})`;
            }
        })
        .catch(() => {
            console.log('Сталась помилка. Наші котики вже працюють над цим');
        });
}


collectData('Kyiv');



btn.addEventListener('click', () => {

    collectData(input.value);
    insertValue();

});