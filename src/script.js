let seacrhForm = document.querySelector("#search");
let formInput = document.querySelector("#cities");
let mainCloud = document.querySelector("#mainCl");
let Condition = document.querySelector("#condition");
let mainTemparature = document.querySelector("#temp");
let temparatureUnit = document.querySelector("#temp-unit");
let dateAndtime = document.querySelector("#datetime");
let currentLocation  = document.querySelector("#location");
let hourlYYButton = document.querySelector("#hour");
let weekButton = document.querySelector("#weekActive");
let celciusButton = document.querySelector("#celciusActive");
let fahrenheitButton = document.querySelector("#fahrenheit");
let weatherboxes = document.getElementById("weatherBoxes");
let uvIndex = document.querySelector("#UVVindex");
let uvvText = document.getElementById("uvvvalue");
let windSpeed = document.querySelector("#windspeed");
let sunrise = document.querySelector("#sunRise");
let sunset = document.querySelector("#sunSet");
let humidity = document.querySelector("#humidity");
let humidityValue = document.querySelector("#humidityvalue");
let visibillty = document.querySelector("#visibilty");
let visibilityValue = document.querySelector("#visibiltyvalue");
let airqulty = document.querySelector("#air");
let airValue = document.querySelector("#airvalue");

let currentCity = "";
let currentUnit = "c";
let hourlyorWeek = "week";

/***______function to update the date and the time______***/
    function dateAndTime(){
        let now = new Date(), 
        hour = now.getHours(),
        minute = now.getMinutes();

        /**__________Array for days__________ **/
            let days = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ];
        /**__________Array for days__________ **/

        /**__________24 houres format__________ **/
            hour = hour % 24;
            if(hour < 12){
                hour = "0" + hour;
            }
            if(minute < 12){
                minute = "0" + minute;
            }
            let day = days[now.getDay()];
            return `${day}, ${hour}:${minute}`;
        /**__________24 houres format__________ **/
    };

    /***Printing function on the field where the time and date are****/
        dateAndtime.innerHTML = dateAndTime();
    /***Printing function on the field where the time and date are****/

    //***Updating time every single second***/
        setInterval(() =>{
            dateAndtime.innerHTML = dateAndTime();
        }, 1000);
    //***Updating time every single second***/
/***______function to update the date and the time______***/

//////////////////////////////////////////////////////////////

/***______function to get public IP with Fetch______***/
        function publicIP(){
            fetch("https://geolocation-db.com/json/",{
                method: "GET",
                headers: {},
            })
            .then((response) => response.json())
            .then((data) =>{
                currentCity = data.city;
                weatherDataApi(data.city, currentUnit, hourlyorWeek);
            });
        };

        publicIP();

    /***______function to get weather with Fetch______***/
        function weatherDataApi(city, unit, hourlyorWeek){
            let apikey = "HRNCNAFZL27QHM7XAQ6F47CUJ";
            fetch(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apikey}&contentType=json`,
                {
                    method: "GET",
                    headers: {},
                }
            )
            .then ((response) => response.json())
            .then((data) => {
                let today = data.currentConditions;
                if (unit === "c"){
                    mainTemparature.innerHTML = today.temp.toFixed(0);
                }else{
                    mainTemparature.innerText = celciusToFahrenheit(today.temp);
                }
                currentLocation.innerText = data.resolvedAddress;
                uvIndex.innerText = today.uvindex;
                Condition.innerText = today.conditions;
                windSpeed.innerText = today.windspeed.toFixed(0) + " km/h";
                humidity.innerText = today.humidity.toFixed(0) + "%";
                visibillty.innerText = today.visibility + " Km";
                airqulty.innerText = today.winddir;
                //***This is functions for measuring status of these elements***//
                    measurmentUVindex(today.uvindex);
                    measureHumidityValue(today.humidity);
                    measureVisibilityStatus(today.visibility);
                    measureAirValue(today.winddir);
                    sunrise.innerText = FormatingtimeTo12Hour(today.sunrise)
                    sunset.innerText = FormatingtimeTo12Hour(today.sunset)
                    mainCl.src = cloudIcons(today.icon);
                //***This is functions for measuring status of these elements***//

                //***Function to oppening Forecast***//
                    if(hourlyorWeek === "hourly"){
                        OpeningForecast(data.days[0].hours, unit , "day")
                    } else{
                        OpeningForecast(data.days, unit, "week");
                    }
                //***Function to oppening Forecast***// 
            });
        }

        function celciusToFahrenheit(mainTemparature){
            return ((mainTemparature * 9) / 5 + 32).toFixed(0);
        }
    /***______function to get weather with Fetch______***/
/***______function to get public IP with Fetch______***/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//***______Function IF ELSE for forecast______***/
    
    //***Function to get on time status from UVindex***/
        function measurmentUVindex(uvIndex){
            if(uvIndex < 2){
            uvvText.innerText = "Low" 
            }else if (uvIndex < 5){
            uvvText.innerText = "Moderate"
            }else if( uvIndex < 7){
            uvvText.innerText = "High"
            }else if(uvIndex < 10){
            uvvText.innerText = "Very high"
            }else if (uvIndex < 11){
            uvvText.innerText = "Extreme"
            }
        }
    //***Function to get on time status from UVindex***/

    //***Function to measure Humidity status***/
        function measureHumidityValue(humidity){
            if(humidity < 30){
            humidityValue.innerText = "Low" 
            }else if (humidity < 60){
            humidityValue.innerText = "Moderate"
            }else if( humidity < 70){
            humidityValue.innerText = "pair"
            }else if(humidity > 70){
            humidityValue.innerText = "high"
            }
        }
    //***Function to measure Humidity status***/

    //***Function to measure Visibillity status***/
        function measureVisibilityStatus(visibility){
            if(visibility < 0.3){
                visibilityValue.innerText = "Derse Fod"
            }else if(visibility < 0.16){
                visibilityValue.innerText = "Moderate fog"
            }else if(visibility < 0.35){
                visibilityValue.innerText = "Light fog"
            }else if(visibility < 1.15){
                visibilityValue.innerText = "Ver light fog"
            }else if(visibility < 2.17){
                visibilityValue.innerText = "Light mist"
            }else if(visibility < 5.5){
                visibilityValue.innerText = "Very light mist"
            }else if(visibility < 10.8){
                visibilityValue.innerText = "Clear air"
            }else{
                visibilityValue.innerText = "Very clear air"
            }
        }
    //***Function to measure Visibillity status***/

    //***Function to measure Air Quality***/
        function measureAirValue(airqulty){
            if(airqulty < 50){
                airValue.innerText = "Good"
            }else if(airqulty < 100){
                airValue.innerText = "Moderate"
            }else if(airqulty < 150){
                airValue.innerText = "Unhealthy for sensitive group"
            }else if(airqulty < 200){
                airValue.innerText = "Unhealthy"
            }else if(airqulty < 250){
                airValue.innerText = "Very unhealthy"
            }else{
                airValue.innerText = "Hazardous for health"
            }
        }
    //***Function to measure Air Quality***/

    //***Function to get weather icon depens on the weather***/
        function cloudIcons(conditions){
            if(conditions === "snow"){
            return "svg/snowy-3.svg"
            }else if(conditions === "snow-showers-day"){
            return "svg/snowy-2-day.svg"
            }else if(conditions === "snow-showers-night"){
            return "svg/snowy-2-night.svg"
            }else if(conditions === "thunder-rain"){
            return "svg/severe-thunderstorm.svg"
            }else if(conditions === "thunder-showers-day"){
            return "svg/scattered-thunderstorms-day.svg"
            }else if(conditions === "thunder-showers-night"){
            return "svg/scattered-thunderstorms-night.svg"
            }else if(conditions === "rain"){
            return "svg/rainy-3.svg" 
            }else if(conditions === "showers-day"){
            return "svg/rainy-2-day.svg"
            }else if(conditions ==="showers-night"){
            return "svg/scattered-rainy-2-night.svg"
            }else if(conditions === "fog"){
            return "svg/fog.svg"
            }else if(conditions === "wind"){
                return "svg/wind.svg"
            }else if(conditions === "cloudy"){
                return "svg/cloudy.svg"
            }else if(conditions === "partly-cloudy-day"){
                return "svg/cloudy-2-day.svg"
            }else if(conditions === "partly-cloudy-night"){
                return "svg/cloudy-2-night.svg"
            }else if(conditions === "clear-day"){
                return "img/Fullsun.png"
            }else if(conditions === "clear-night"){
                return "svg/clear_night.svg"
            }
        }
    //***Function to get weather icon depens on the weather***/
    
//***______Function IF ELSE for forecast______***/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//***______Function that will print everything about small boxex for the weahet 5days and "today"______***/
    /***______Function to get name of the day______***/
        function gettingDayname(date){
            let day = new Date(date);
            let days =[
                "Sunday",
                "Monday",
                "Thuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ];
            return days[day.getDay()];
        }
    /***______Function to get name of the day______***/

    /***______Formating time in cards______***/
        function FormatingtimeTo12Hour(time){
            let hour = time.split(":")[0];//
            let minute = time.split(":")[1];//
            hour = hour % 24 ;//
            hour = hour ? hour: 24;//
            hour = hour < 10 ? "0" + hour : hour;//
            minute = minute < 10 ? "" + minute : minute;//
            let StartTime = hour + ":" + minute //
            return StartTime;
        }
    /***______Formating time in cards______***/

    /***______Function to get time______***/
        function getHour(time){
            let hour = time.split(':')[0];
            let minute = time.split(":")[1];
            if(hour > 24){
                hour = hour = 24;
                return `${hour}:${minute}`
            }else{
                return `${hour}:${minute}`
            }
        }
    /***______Function to get time______***/

    /***______Function to open forecast 7dats or today 24/7______***/
        function OpeningForecast(data, unit, type){
            weatherboxes.innerHTML = "";
            let day = 0;
            let numCards = 0;
            if(type === "day"){
                numCards = 24;
            }else{
                numCards = 7;
            }

            /***______Counter______***/
                for(let i = 0; i < numCards; i++){
                    let carD = document.createElement("div");
                    carD.classList.add("CARD");
                    let datName = getHour(data[day].datetime);
                    if(type === "week"){
                        datName = gettingDayname(data[day].datetime);
                    }
                    let dayTemp = data[day].temp;
                    if(unit === "f"){
                        dayTemp = celciusToFahrenheit(data[day].temp);
                    }
                    let cloudIcoN = data[day].icon;
                    let iconSrc = cloudIcons(cloudIcoN);
                    let tempUnit = "°C"
                    if(unit === "f"){
                        tempUnit = "°F"
                    }
                    carD.innerHTML=`
                        <h2 id="nameofDay" class="CARDheadingDayName">${datName}</h2>
                        <div id="box-icon">
                            <img src="${iconSrc}" class="CARDSvgIcons" alt="cloud icon">
                        </div>
                        <div id="dayTemp">
                            <h2 id="temp">${dayTemp}</h2> 
                            <span id="tempuUnit">${tempUnit}</span>
                        </div>
                    
                    `;
                    weatherboxes.appendChild(carD);
                    day++;
                }
            /***______Counter______***/
        }
    /***______Function to open forecast 7dats or today 24/7______***/
//***______Function that will print everything about small boxex for the weahet 5days and "today"______***/





fahrenheitButton.addEventListener("click", () => {
    changeUnit("f");
  });
  
  celciusButton.addEventListener("click", () => {
    changeUnit("c");
  });
  /*** Evenet listiners ***/
  
  // function to change unit
  function changeUnit(unit) {
    if (currentUnit !== unit) {
      currentUnit = unit;
      // temparatureUnit.forEach((elem) => {
      //   elem.innerText = `°${unit.toUpperCase()}`;
      // });
      if (unit === "c") {
        celciusButton.classList.add("active");
        fahrenheitButton.classList.remove("active");
      } else {
        celciusButton.classList.remove("active");
        fahrenheitButton.classList.add("active");
      }
      weatherDataApi(currentCity, currentUnit, hourlyorWeek);
    }
  }
  
  hourlYYButton.addEventListener("click", () => {
    forecastopen("hourly");
  });
  
  weekButton.addEventListener("click", () => {
    forecastopen("week");
  });
  // function to change unit
  
  // function to change hourly to weekly or vice versa
  function forecastopen(unit) {
    if (hourlyorWeek !== unit) {
      hourlyorWeek = unit;
      if (unit === "hourly") {
        hourlYYButton.classList.add("active");
        weekButton.classList.remove("active");
      } else {
        hourlYYButton.classList.remove("active");
        weekButton.classList.add("active");
      }
      weatherDataApi(currentCity, currentUnit, hourlyorWeek);
    }
  };
  // function to change hourly to weekly or vice versa
  
  //Event listiner for the serach bar
  seacrhForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let currentLocation = formInput.value;
  if(currentLocation){
    currentCity = currentLocation;
    weatherDataApi(currentCity, currentUnit, hourlyorWeek);
  }
  });
  //Event listiner for the serach bar