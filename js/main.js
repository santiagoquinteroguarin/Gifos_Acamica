// Event to input search - home
document.querySelector('.text').addEventListener('click', changeColorBtn);

// Change loupe and color button search
function changeColorBtn(e) {
    e.preventDefault();
    let element = document.getElementById('html').attributes;

    if(element[2].value === 'dark') {
        // change loupe
        let loupe = document.getElementById('loupe');
        loupe.src = '/assets/lupa_light.svg';
        // change text color button
        let textBtn = document.querySelector('#btn-search');
        textBtn.style.color = '#FFFFFF';
        // change background button search
        let color = document.querySelector('.submit');
        color.style.background = '#EE3EFE';
        color.style.border = '1px solid #110038';
    } else {
        // change luope
        let loupe = document.getElementById('loupe');
        loupe.src = '/assets/lupa.svg';
        // change text color button
        let textBtn = document.querySelector('#btn-search');
        textBtn.style.color = '#110038';
        // change background button search
        let color = document.querySelector('.submit');
        color.style.background = '#F7C9F3';
        color.style.border = '1px solid #110038';
    }
}

// dropdown
function dropDown() {
    document.getElementById("dropdown").classList.toggle("show");
}

window.onclick = function (e) {
    if (!e.target.matches(".arrow-down")) {
      var myDropdown = document.getElementById("dropdown");
      if (myDropdown.classList.contains("show")) {
        myDropdown.classList.remove("show");
      }
    }
};

// API
const apiKey = '&api_key=ebk0jnF3WxzqiudF7E9fiRMumlMantoI';
const URL = 'http://api.giphy.com/v1/gifs/search?q=';
const URLTrendings = 'http://api.giphy.com/v1/gifs/trending?rating=g';
let gifsSuggestions = document.querySelectorAll('.suggestions__content_gif-giphy');
let gifsTrendings = document.querySelectorAll('.trendings__content');

const renderTrendings = async(arrayGifs, arrayElements, elementClass, nameClass) => {
    for(let i of arrayElements.keys()){
        let gif = document.createElement('img');
        gif.src = arrayGifs[Math.floor(Math.random() * (99 - 1) + 1)].images.preview_webp.url;
        gif.className = nameClass;
        arrayElements[i].appendChild(gif);
    }
}
    
const renderSuggestions = async(arrayGifs) => {
    for(let i of gifsSuggestions.keys()){
        gifsSuggestions[i].src = arrayGifs[Math.floor(Math.random() * (99 - 1) + 1)].images.preview_webp.url;   
    }
}
    
const getGifDataSuggestions = async(keyword) => {
    const answer = await fetch(`${URL}${keyword}${apiKey}&limit=100`);
    let data = await answer.json();
    return data.data;
}

const getGifDataTrendings = async() => {
    const answer = await fetch(`${URLTrendings}${apiKey}&limit=100`);
    let data = await answer.json();
    return data.data;
}

function callKeyword() {
    gifKeyword = document.getElementById('search').value;
    getGifDataSuggestions(gifKeyword)
            .then((responseGifData) => renderSuggestions(responseGifData))
            .catch(function(error) {
                console.error('ERROR' + error);
            })
}
    
getGifDataSuggestions('pokemon')
    .then((responseGifData) => renderSuggestions(responseGifData))
    .catch(function(error) {
        console.error('ERROR' + error);
    })

getGifDataTrendings()
    .then(responseGifData => renderTrendings(responseGifData, gifsTrendings, '.trendings__content-gif', 'trendings__content-gif'))
    .catch(function(error) {
        console.error('ERROR' + error);
    })