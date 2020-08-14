// parameters
const APIKEY = '&api_key=ebk0jnF3WxzqiudF7E9fiRMumlMantoI';
const URL_KEYWORD = 'https://api.giphy.com/v1/gifs/search?q=';
const URL_TRENDINGS = 'https://api.giphy.com/v1/gifs/trending?rating=g';

// get number of items
let elements = ['.category-one','.category-two','.category-three','.category-four'];
let tagsSuggestions = ['.tags1','.tags2','.tags3','.tags4'];

let gifsTrendings = document.querySelectorAll('.trendings__content');
// let tagsSuggestions = document.querySelectorAll('.text-tags');
let trendings_tags = document.querySelectorAll('.trendings-tags');

class FETCHAPI {
    
    constructor(url, apiKey, keyword) {
        this.url = url;
        this.apiKey = apiKey;
        this.keyword = keyword;
    }

    get getUrl() {
        return this.url;
    }

    get getApiKey() {
        return this.apiKey;
    }

    get getKeyword() {
        return this.keyword;
    }
    
    // fetch data gifs
    async getDataApi() {
        try {
            const answer = await fetch(`${this.getUrl}${this.getApiKey}&limit=100`);
            let data = await answer.json();
            return data.data;
        } catch {
            console.error(error);
        }
    }

    // fetch data gifs keyword
    async getDataApiKeyword() {
        try {
            const answer = await fetch(`${this.getUrl}${this.getKeyword}${this.getApiKey}&limit=100`);
            let data = await answer.json();
            return data.data;
        } catch {
            console.error(error);
        }
    }

    // print gifs of Trendings
    renderTrendings(arrayGifs, arrayElements, nameClass) {
        for(let i of arrayElements.keys()){
            let random = Math.floor(Math.random() * (25 - 1) + 1);
            let gif = document.createElement('img');
            gif.src = arrayGifs[random].images.preview_webp.url;
            gif.className = nameClass;
            arrayElements[i].appendChild(gif);
            tags(i, random);
        }
        // print tags
        function tags(i, random) {
            let tags = arrayGifs[random].title;
            trendings_tags[i].innerHTML = "#" + tags.replace(/ +/g," #");tags;
        }
    }

    // print gifs of suggestions
    renderSuggestions(arrayGifs, element, tag) {
        for(let i of element.keys()){
            let random = Math.floor(Math.random() * (25 - 1) + 1);
            element[i].src = arrayGifs[random].images.preview_webp.url;
            tags(i, random);
        }
        // print tags
        function tags(i, random) {
            let tags = arrayGifs[random].title;
            tag[i].innerHTML = "#" + tags.replace(/ +/g," #");
        }
    }
}


// get data gifs trendings ---------------------------------
new FETCHAPI(URL_TRENDINGS, APIKEY).getDataApi()
    .then((response) => new FETCHAPI(URL_TRENDINGS, APIKEY).renderTrendings(response, gifsTrendings, 'trendings__content-gif'))
    .catch((error) => console.error(error))

// get data gifs keyword - page load ------------------------------------
let categories = ['pokemon','goku','simpson','rick and morty'];
for(let i of categories.keys()) {
    new FETCHAPI(URL_KEYWORD, APIKEY, getCategory(i)).getDataApiKeyword()
    .then((response) => {
        //  render gifs suggestions
        new FETCHAPI(URL_KEYWORD, APIKEY, getCategory(i)).renderSuggestions(response, getElements(i), getTags(i))
    })
    .catch((error) => console.error(error))
}

function getCategory(i) {
    return categories[i];
}

function getElements(i) {
    return document.querySelectorAll(elements[i]);
}

function getTags(i) {
    let tag = document.querySelectorAll(tagsSuggestions[i])
    return tag;
}

// search category ----------------------------------------------------------
document.querySelector('#btn-submit').addEventListener('click', function(){
    let gifKeyword = document.getElementById('search').value;
    trendings(gifKeyword)
})

function trendings(gifKeyword) {
    document.querySelector('#title-trendings').innerHTML = gifKeyword;
    new FETCHAPI(URL_KEYWORD, APIKEY, gifKeyword).getDataApiKeyword()
    .then((response) => {
        let elements = document.querySelectorAll('.trendings__content-gif')
        elements.forEach(element => {
            element.remove()
         });
        new FETCHAPI(URL_TRENDINGS, APIKEY).renderTrendings(response, gifsTrendings, 'trendings__content-gif')
    })
    .catch((error) => console.error(error))
}

// buttons ver mas...
document.querySelector('.button-one').addEventListener('click', function(){
    trendings('pokemon')
})

document.querySelector('.button-two').addEventListener('click', function(){
    trendings('goku')
})

document.querySelector('.button-three').addEventListener('click', function(){
    trendings('simpson')
})

document.querySelector('.button-four').addEventListener('click', function(){
    trendings('rick and morty')
})

export default FETCHAPI;