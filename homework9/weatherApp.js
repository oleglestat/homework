// const url = `https://api.openweathermap.org/data/2.5/weather?q=SEARCH_VALUE&appid=API_KEY&units=metric`;
// const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

import {input, list} from './constants.js';

export class WeatherApp {
    constructor(API_KEY) {
        this.API_KEY = API_KEY;
        this.isLoading = false;
    }

    fetchData = async () => {
        const inputVal = input.value;
        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${this.API_KEY}&units=metric`;

        this.isLoading = true;
        try {
            let response = await fetch( url );
            let data = await response.json();
            console.log( data );
            this.updateDOM( data );
        } catch (err) {
            console.error(err);
        } finally {
            this.isLoading = false;
        }
    }

    updateDOM = (data) => {
        const {main, name, sys, weather} = data;

        const li = document.createElement('li');
        li.classList.add('city');

        li.innerHTML = `<h2 class="city-name">${name}</h2>
                        <div class="city-temp">${main.temp}</div>
                        `;

        list.appendChild(li);
    }
}
