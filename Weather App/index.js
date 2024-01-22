const api_key = "c55b1e93040aecbeffdbfccae21adb8a";
const api_url = "https://api.openweathermap.org/data/2.5/weather?q=";
const search_button = document.getElementById("search-btn");
const search_input = document.getElementById("search");
const weather_img = document.getElementById("weather_img")

async function getWeatherByLocation(city_name = "Delhi") {
    const response = await fetch(api_url + `${city_name} &appid=${api_key}`+"&unit=metric");
    const response_Data = await response.json();
    setWeatherData(response_Data);
}

function setWeatherData(data) {
    console.log("Received data:", data); 
    // checking if data is defined

    if (data && data.main && data.main.temp) {
        document.getElementById("temp-value").innerText = Math.ceil(data.main.temp - 273.15) + "°C";
        document.getElementById("city-name").innerText = data.name;
        document.getElementById("humidity-value").innerText = data.main.humidity + "%";
        document.getElementById("wind-speed-value").innerText = (data.wind.speed * 6.7961165049).toFixed(0) + " Km/hr ";

        //checking the weather from the data and updating the image accordingly

        if(data.weather[0].main == "Clear"){
            weather_img.src="Resources/clear.png"
        }
        if(data.weather[0].main == "Clouds"){
            weather_img.src="Resources/clouds.png"
        }
        if(data.weather[0].main == "Drizzle"){
            weather_img.src="Resources/drizzle.png"
        }
        if(data.weather[0].main == "Mist"){
            weather_img.src="Resources/mist.png"
        }
        if(data.weather[0].main == "Rain"){
            weather_img.src="Resources/rain.png"
        }
        if(data.weather[0].main == "Snow"){
            weather_img.src="Resources/snow.png"
        }

    } else {
        console.error("Invalid data structure:", data);  //in case if error occured in fetching data
    }
}

search_input.addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
        getWeatherByLocation(search_input.value);
    }
})
search_button.addEventListener("click", () => {
    const city_name = search_input.value;
    getWeatherByLocation(city_name);
});

// Default City
getWeatherByLocation(city_name = "Delhi")