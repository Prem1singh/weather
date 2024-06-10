var city =document.querySelector('#cityInput');
var weatherInfo=document.querySelector('#weatherInfo');
var vidsrc=document.querySelector('#vidsrc');
var vid=document.querySelector('#vid')
city.addEventListener(
    'keyup', async(e)=>{

        if(e.key=="Enter"){
            city.disabled=true
            weatherInfo.innerHTML=` <div id="loader" class="spinner-border text-primary" role="status"">
            <span class="sr-only">Loading...</span>
        </div>`;
            var cityName=e.target.value;
            var response= await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=21805bff7224936fa25d6cec016a0a4b')
           if (response.status==200) {
            var data= await response.json();
            var iconCode = data.weather[0].icon;
            var iconUrl = 'http://openweathermap.org/img/wn/' + iconCode + '.png';
            var temp=Math.round(data.main.temp-273.15);
            var minTamp=Math.round(data.main.temp_min-273.15);
            var cond=data.weather[0].description;
            weatherInfo.innerHTML=`<div class="logo">
            <img src="${iconUrl}" alt="Weather Icon" width="100px">
            </div>
            <div class='info'>
            <h2>${cityName}</h2>
            <p>Temperature: ${temp}
            <p>Condition: ${cond}
            <p>Min-Temp:${minTamp}
            </div>
            `
            if (cond=='clear sky') {
                vidsrc.src="vid/clear.mp4";
                vid.load();
            }else if (cond=='overcast clouds' ||cond=='broken clouds') {
                vidsrc.src="vid/cloud.mp4";
                vid.load();
            }
            else if(cond=='moderate rain'|| cond=='light rain'||cond=='heavy intensity rain'){
                vidsrc.src="vid/rain.mp4";
                vid.load();
            }
            else if(cond=='heavy rain' ||cond=='rain'){
                vidsrc.src="vid/rain2.mp4";
                vid.load();
            }
            else if(cond=='haze'){
                vidsrc.src="vid/haze.mp4";
                vid.load();
            }
            else if (cond=='wind') {
                vidsrc.src="vid/wind.mp4";
                vid.load();
            }
            else if (cond=='snow'||cond=='heavy snow') {
                vidsrc.src="vid/snow.mp4";
                vid.load();
            }
           }
           else{
            weatherInfo.innerHTML=`<p>Enter a valid city`;
           }
           city.disabled=false;
        }
    }
)

