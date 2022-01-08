


class App{
    constructor(){
        this.location = document.querySelector('[data-app-location]');
        this.condition = document.querySelector('[data-app-condition]');
        this.temp = document.querySelector('[data-app-temp]');
        this.tempF = document.querySelector('[data-app-tempF]');
        this.highTemp = document.querySelector('[data-app-highTemp]');
        this.highTempF = document.querySelector('[data-app-highTempF]');
        this.lowTemp = document.querySelector('[data-app-lowTemp]');
        this.lowTempF = document.querySelector('[data-app-lowTempF]');
        this.gif = document.querySelector('[data-app-gif]');
        this.clock = document.querySelector('[data-app-clock]');
        this.time = new Date().toLocaleString('en-US'); 
        this.container = document.querySelector('#container');

        this.sunrise = document.querySelector('[data-app-sunrise]');
        this.sunset = document.querySelector('[data-app-sunset]');
        this.rainChance = document.querySelector('[data-app-rainChance]');
        this.humidity = document.querySelector('[data-app-humidity]');
        this.windM = document.querySelector('[data-app-windM]');
        this.wind = document.querySelector('[data-app-wind]');
        this.feelsLike = document.querySelector('[data-app-feelsLike]');
        this.feelsLikeF = document.querySelector('[data-app-feelsLikeF]');
        this.precipitation = document.querySelector('[data-app-precipitation]');
        this.windDir = document.querySelector('[data-app-windDir]');
        this.visibility = document.querySelector('[data-app-visibility]');
        this.visibilityM = document.querySelector('[data-app-visibilityM]');
        this.uv = document.querySelector('[data-app-uv]');
           
        this.init()
    }

    init(){
        this.getApi()
        this.clockHandler()
        this.container.addEventListener('click',this.changeUnits)
    }

    clockHandler(){
        this.clock.innerText = this.time
        setInterval(() => {
            this.time = new Date().toLocaleString('en-US');
            this.clock.innerText = this.time
        }, 500);

    }

    changeUnits(){
        const toggleEl = document.querySelectorAll('.toggle')
        toggleEl.forEach(item=>{
            item.classList.toggle('d-none')
        })
    }

    getApi(){
            /*
            *
            * https://ip-api.com/docs/api:json
            * 
            */
            fetch('http://ip-api.com/json/?fields=status,region,city,query')
            .then(data=>data.json())
            .then(data => {
                this.location.innerText = `${data.city} - ${data.region}`

                fetch(`http://api.weatherapi.com/v1/forecast.json?key=286f24b068bd4a96871163832210412&q=${data.query}&days=1&aqi=no&alerts=no`)
                .then(dataWeather=>dataWeather.json())
                // .then(dataWeather=>console.log(dataWeather))
                .then(dataWeather => {
                    this.gif.src = dataWeather.current.condition.icon;
                    this.condition.innerText = dataWeather.current.condition.text;
                    this.temp.innerHTML = `${dataWeather.current.temp_c} &#176;C`;
                    this.tempF.innerHTML = `${dataWeather.current.temp_f} &#8457`;
                    this.highTemp.innerHTML = `H ${dataWeather.forecast.forecastday[0].day.maxtemp_c} &#176;C`
                    this.highTempF.innerHTML = `H ${dataWeather.forecast.forecastday[0].day.maxtemp_f} &#8457`
                    this.lowTemp.innerHTML = `L ${dataWeather.forecast.forecastday[0].day.mintemp_c} &#176;C`
                    this.lowTempF.innerHTML = `L ${dataWeather.forecast.forecastday[0].day.mintemp_f} &#8457`
                    // more items
                    this.sunrise.innerHTML = dataWeather.forecast.forecastday[0].astro.sunrise
                    this.sunset.innerHTML = dataWeather.forecast.forecastday[0].astro.sunset
                    this.rainChance.innerHTML = `${dataWeather.forecast.forecastday[0].day.daily_chance_of_rain}%` 
                    this.humidity.innerHTML = `${dataWeather.current.humidity}%`
                    this.windM.innerHTML = `${dataWeather.current.wind_mph} mph`
                    this.wind.innerHTML = `${dataWeather.current.wind_kph} kmh`
                    this.feelsLike.innerHTML = `${dataWeather.current.feelslike_c} &#176;C`
                    this.feelsLikeF.innerHTML = `${dataWeather.current.feelslike_f} &#8457`
                    this.precipitation.innerHTML = `${dataWeather.current.precip_mm} mm`
                    this.windDir.innerHTML = dataWeather.current.wind_dir
                    this.visibility.innerHTML = `${dataWeather.current.vis_km} km`
                    this.visibilityM.innerHTML = `${dataWeather.current.vis_miles} mi`
                    this.uv.innerHTML = dataWeather.current.uv
                })

            }) 
        }
}

const initAppp = new App


