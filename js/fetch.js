// parameters
const APIKEY = '&api_key=ebk0jnF3WxzqiudF7E9fiRMumlMantoI';
const URL_KEYWORD = 'http://api.giphy.com/v1/gifs/search?q=';
const URL_TRENDINGS = 'http://api.giphy.com/v1/gifs/trending?rating=g';

// get number of items
let gifsSuggestions = document.querySelectorAll('.suggestions__content_gif-giphy');
let gifsTrendings = document.querySelectorAll('.trendings__content');
let tagsSuggestions = document.querySelectorAll('.text-tags');
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
    renderTrendings(arrayGifs, arrayElements, elementClass, nameClass) {
        for(let i of arrayElements.keys()){
            let random = Math.floor(Math.random() * (99 - 1) + 1);
            let gif = document.createElement('img');
            gif.src = arrayGifs[random].images.preview_webp.url;
            gif.className = nameClass;
            arrayElements[i].appendChild(gif);
            tags(i, random);
        }
        // print tags
        function tags(i, random) {
            let tags = arrayGifs[random].slug;
            trendings_tags[i].innerHTML = tags;
        }
    }

    // print gifs of suggestions
    renderSuggestions(arrayGifs) {
        for(let i of gifsSuggestions.keys()){
            let random = Math.floor(Math.random() * (99 - 1) + 1);
            gifsSuggestions[i].src = arrayGifs[random].images.preview_webp.url;
            tags(i, random);
        }
        // print tags
        function tags(i, random) {
            let tags = arrayGifs[random].slug;
            tagsSuggestions[i].innerHTML = tags;
        }
    }
}

// get data gifs trendings ---------------------------------
const GIFS_TRENDINGS = new FETCHAPI(URL_TRENDINGS, APIKEY).getDataApi()
    .then((response) => new FETCHAPI(URL_TRENDINGS, APIKEY).renderTrendings(response, gifsTrendings, '.trendings__content-gif', 'trendings__content-gif'))
    .catch((error) => console.error(error))
    .finally(console.log('complete trendings'));

// get data gifs keyword - page load ------------------------------------
const GIFS_KEYWORD = new FETCHAPI(URL_KEYWORD, APIKEY, 'pokemon').getDataApiKeyword()
    .then((response) => {
        //  render gifs suggestions
        new FETCHAPI(URL_KEYWORD, APIKEY, 'pokemon').renderSuggestions(response)
    })
    .catch((error) => console.error(error))
    .finally(console.log('complete page load'));

// search category ----------------------------------------------------------
document.querySelector('#btn-submit').addEventListener('click', function(){
    let gifKeyword = document.getElementById('search').value;
    const GIFS_KEYWORD = new FETCHAPI(URL_KEYWORD, APIKEY, gifKeyword).getDataApiKeyword()
    .then((response) => {
        // render gifs suggestions
        new FETCHAPI(URL_KEYWORD, APIKEY,  gifKeyword).renderSuggestions(response)
    })
    .catch((error) => console.error(error))
    .finally(console.log('complete search'));
})

export default FETCHAPI;