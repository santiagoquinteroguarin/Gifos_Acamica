// parameters
const APIKEY = '&api_key=ebk0jnF3WxzqiudF7E9fiRMumlMantoI';
const URL_KEYWORD = 'https://api.giphy.com/v1/gifs/search?q=';
const URL_TRENDINGS = 'https://api.giphy.com/v1/gifs/trending?rating=g';
const URL_TAGS = 'https://api.giphy.com/v1/gifs/search/tags?q=';

let counter = 0;

// get number of items
let elements = ['.category-1','.category-2','.category-3','.category-4'];
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

    // fetch data gifs Tags
    async getDataApiTags() {
        try {
            const answer = await fetch(`${this.getUrl}${this.getKeyword}${this.getApiKey}`);
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

// CTA - input search
document.getElementById('search').addEventListener('keypress', onKeyDown);
let word = '';
let vector = new Array();
const elementos = document.querySelectorAll('.keyword_result');

document.getElementById('search').addEventListener('keydown', borrar);

function borrar(event) {
    const key = event.key;
    if(key === "Backspace" || key === 'Delete') {
        word = '';
    }
}

function onKeyDown(event) {
    let key = event.key; // "A", "1", "Enter", "ArrowRight"...
    word += key;
    new FETCHAPI(URL_TAGS, APIKEY, word).getDataApiTags()
        .then((response) => {
            ciclo(response)
            
        })
        .catch((error) => console.log(error))
}


function ciclo(array) {
    for(let i of array.keys()) {
        vector.push(array[i].name)
        if(i >= 2) {
            break;
        }
    }

    for(let i of elementos.keys()) {
        elementos[i].innerHTML = vector[i];
    }
    vector = [];
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
    document.getElementById("keywordId").classList.remove('showK')
    let gifKeyword = document.getElementById('search').value;
    if(gifKeyword == '') {
        new FETCHAPI(URL_TRENDINGS, APIKEY).getDataApi()
        .then((response) => {
            let elements = document.querySelectorAll('.trendings__content-gif')
            elements.forEach(element => {
                element.remove()
            });
            new FETCHAPI(URL_TRENDINGS, APIKEY).renderTrendings(response, gifsTrendings, 'trendings__content-gif')
        })
        .catch((error) => console.error(error))
    } else {
        // CTA - function trendings
        trendings(gifKeyword)
        // create button of searched words
        renderSearchedWords(gifKeyword);
    }

    let elem = document.querySelector('.submit')
    elem.disabled = true;
    elem.style.background = '#E6E6E6';
    elem.style.border = 'none';
    document.querySelector('#loupe').src = '/assets/Combined Shape.svg';
    document.querySelector('#btn-search').style.color = 'var(--color-grey-4)';
})

function renderSearchedWords(gifKeyword) {
    let element = document.querySelector('.searched_words');
    element.style.display = 'flex';
    let button = document.createElement('a');
    counter += 1;
    button.id = 'button-' + counter;
    button.onclick = function() {getData(this);}
    button.textContent = gifKeyword;
    element.appendChild(button)
}

function getData(id) {
    trendings(id.textContent);
}

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
document.querySelector('.button-1').addEventListener('click', function(){
    trendings('pokemon')
})

document.querySelector('.button-2').addEventListener('click', function(){
    trendings('goku')
})

document.querySelector('.button-3').addEventListener('click', function(){
    trendings('simpson')
})

document.querySelector('.button-4').addEventListener('click', function(){
    trendings('rick and morty')
})

function validation(word) {
    if(word === 'null' || word === 'undefined') {
        console.log('no')
    } else {
        trendings(word)
        document.getElementById("keywordId").classList.remove('showK')
    }
}

document.querySelector('.keyword_result-1').addEventListener('click', function(){
    let word = document.querySelector('.keyword_result-1').textContent;
    validation(word)
})

document.querySelector('.keyword_result-2').addEventListener('click', function(){
    let word = document.querySelector('.keyword_result-2').textContent;
    validation(word)
})

document.querySelector('.keyword_result-3').addEventListener('click', function(){
    let word = document.querySelector('.keyword_result-3').textContent;
    validation(word)
})



export default FETCHAPI;