window.addEventListener("load", () => {
    let longitude;
    let latitude;
    let units = "si";
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".degree-section");
    const temperatureSpan = document.querySelector(".degree-section span");

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;

        // Add proxy https - enable api from localhost
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const api = `${proxy}https://api.darksky.net/forecast/91cfb320f2c76935fe2a35a265eb9fae/${latitude},${longitude}?${units}`;

        fetch(api).then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temperature , icon } = data.currently;
          // DOM Elements from the API
          temperatureDegree.textContent = temperature;
          locationTimezone.textContent = data.timezone;
          // Set weather icon from skycons
          setIcons(icon, document.querySelector(".icon"));
        });
      });
    }
    function setIcons(icon, iconID) {
      const skycons = new Skycons({ "color" : "black" });
      const currentIcon = icon.replace(/-/g, "_").toUpperCase();
      skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
}
});
