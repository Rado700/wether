const apiKeys = "dd19a7f7791d979a104ad8bfcedf3773";
//http://api.openweathermap.org/geo/1.0/reverse?lat=54.775&lon=56.0375&limit=5&appid=dd19a7f7791d979a104ad8bfcedf3773
//http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

function getWeather(){

const textCity = document.getElementById("nameCity").value;

const xhr = new XMLHttpRequest();
let requestURL = "http://api.openweathermap.org/geo/1.0/direct?q="+textCity+"&limit=1&appid="+apiKeys;
// let requestURL = "https://openweathermap.org/find?q="+textCity
//let requestURL = "http://api.openweathermap.org/geo/1.0/reverse?lat=54.775&lon=56.0375&limit=5&appid=dd19a7f7791d979a104ad8bfcedf3773"
xhr.open('GET', requestURL);
//после получения какого либо ответа от сервера
xhr.onload = () => {
    if(xhr.status !== 200){
        //выводим ошибка в консоль
        console.log('Ошибка ${xhr.status}: ${xhr.statusText}');
        return
    }
    //получения ответ сервера
    const response = xhr.response;
    let json1 = JSON.parse(response);
    let lat = json1[0].lat
    let json2 = JSON.parse(response);
    let lon = json2[0].lon
    

    const xhr1 = new XMLHttpRequest();
    let requestURL1 = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+apiKeys+"&units=metric"
    xhr1.open('GET', requestURL1);
    xhr1.onload = () =>     {
        if(xhr.status !== 200){
            //выводим ошибка в консоль
            console.log('Ошибка ${xhr.status}: ${xhr.statusText}');
            return
        }

        const response = xhr1.response;
        

        let json3 = JSON.parse(response);
        let tempMin = json3.main.temp_min
        let tempMax = json3.main.temp_max
        console.log(tempMin+" "+tempMax);

        const temperature = document.getElementById("weatherOutPut")
        temperature.textContent = ("tempMin "+tempMin+" tempMax "+ tempMax)

    };
    xhr1.onerror = () => {//происходит когда запрос совсем не получилось выполнить
        console.log('Ошибка при выполнений запроса');
    };
    xhr1.send();




}

//срабатывает когда запрос не может быть выполнен (например нет соединения)
xhr.onerror = () => {//происходит когда запрос совсем не получилось выполнить
    console.log('Ошибка при выполнений запроса');
};
xhr.send();
}
