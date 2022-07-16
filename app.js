
// getting the longitude and latitude of our current location
window.addEventListener('load', () => {
    let long;
    let lat;
    let apiKey = '2ceaf328e8b549b7b4e7a1036b01f5ee';
    

    let cityName = document.querySelector('.location-city');
    let temperatureValue = document.querySelector('.temperature-degree');
    let temperatureDescription = document.querySelector('.temperature-description');
    let weatherIcon = document.querySelector('.weather-icon-img') ;
    let temperatureSpan = document.querySelector('.temperatureSymbol');
    let temperatureSection = document.querySelector('.degree-section');
    let date_time = document.querySelector('.datetime');
    


    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position =>{  // position can be named anything
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const proxy = 'https://cors-anywhere.herokuapp.com/';

        const api = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=${apiKey}&lang=eng`;
        
        
        //? We use .then because we don't know how long the api will take to fetch the information from 
        //? the servers and we don't want the rest of our code to run at the same time
        fetch(api).then(response =>{  // response can be named anything
          return response.json();
        }).then(data =>{
          console.log(data);
          const { temp, sunrise, sunset, city_name, datetime } = data.data[0];
          const { description, icon } = data.data[0].weather;

          cityName.textContent = city_name;
          temperatureValue.textContent = Math.floor(temp); // Comes as Celsius as default
          temperatureDescription.textContent = description;
          weatherIcon.src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
          date_time.textContent = datetime;
         



          let fahrenheit = Math.floor(temperatureValue.textContent * 1.8) + (32);
          let celsius = Math.floor(temp);

          temperatureSection.addEventListener('click', () => {
            if(temperatureSpan.textContent == '°C'){
                temperatureSpan.textContent = '°F';
                temperatureValue.textContent = fahrenheit;
                } else {
                  if(temperatureSpan.textContent == '°F'){
                      temperatureSpan.textContent = '°C';
                      temperatureValue.textContent = celsius;
                    }
                  }
          });



        });
      });
    }

});

// https://www.youtube.com/watch?v=gU45wDAFMIM