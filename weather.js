
let search = document.getElementById('search')

async function getdata() {
    let city = document.getElementById('inputcity').value;
    let data = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=c156157419e14c22b5e63919251705&q=${city}&aqi=yes`
    );
    return await data.json();
}

search.addEventListener("click", async()=>{
    let result = await getdata();
    let iconurl = "https:"+result.current.condition.icon;
    let icon = document.getElementById('weatherIcon');
    icon.style.display="block";
    icon.src = iconurl;
    let info = document.getElementById('info');
    info.style.marginTop="-120px";
    info.innerText = `
    City: ${result.location.name}
    Region: ${result.location.region}
    Country: ${result.location.country}
    Local Time: ${result.location.localtime}
    Temp: ${result.current.temp_c}°C
    Humidity: ${result.current.humidity}%
`;

})