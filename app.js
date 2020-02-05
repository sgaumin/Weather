window.addEventListener('load', ()=>{
	let long;
	let lat;
	
	let temperatureDegree = document.querySelector(".temperature-degree");
	let temperatureDescription = document.querySelector(".temperature-description");
	let temperatureSection = document.querySelector(".temperature");
	let temperatureSpan = document.querySelector(".temperature span");
	let locationTimezone = document.querySelector(".location-timezone");
	
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position =>{
			long = position.coords.longitude;
			lat = position.coords.latitude;
			
			const proxy = `https://cors-anywhere.herokuapp.com/`;
			const api = `${proxy}https://api.darksky.net/forecast/56e6137bda3b0572b1d57602ec91364f/${lat},${long}`;
			
			fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data => {
					console.log(data);
				
				// Retrieve Data from API
				const {temperature, summary, icon} = data.currently;
				temperatureDegree.textContent = temperature;	
				temperatureDescription.textContent = summary;
				locationTimezone.textContent = data.timezone;
				
				let celcius = (temperature - 32) * (5/9);
				
				// Set Icons
				setIcons(icon, document.querySelector('.icon'));
				
			
				// Change Temperature to Celcius
				temperatureSection.addEventListener('click', () => {
					if(temperatureSpan.textContent === "°F"){
						temperatureSpan.textContent = "°C";
						temperatureDegree.textContent = Math.floor(celcius);
					}else{
						temperatureSpan.textContent = "°F";
						temperatureDegree.textContent = temperature;
					}
				})
			});
		});		
	}
	
	function setIcons(icon, iconID){
		const skycons = new Skycons({color:"white"});
		const currentIcon = icon.replace(/-/g,"_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});