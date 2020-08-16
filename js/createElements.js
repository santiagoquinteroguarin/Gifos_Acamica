function createElements() {
    let container = document.querySelector('.trendings');
    let wrap = document.querySelector('.suggestions');
    createSuggestions(wrap);
    createTrendings(container);
}

function createSuggestions(wrap) {
    for(let i = 1; i <= 4; i++) {
        let item = document.createElement('div')
        let class2 = 'suggestions__content-' + i
        item.className = `suggestions__content ${class2}`;
        item.innerHTML = `
            <div class="suggestions__content_tags">
                <p class="text-tags tags${i}"></p>
            </div>
            <div class="suggestions__content_gif">
                <img class="suggestions__content_gif-giphy category-${i}" src="" alt="">
                <a class="suggestions__content_gif-btn button-${i}" href="#">Ver más…</a>
            </div>
        `;
        wrap.appendChild(item)
    }
}

function createTrendings(container) {
    for(let i = 1; i <= 10; i++) {
        let item = document.createElement('div')
        let class2 = 'trendings__content-' + i
        item.className = `trendings__content ${class2}`;
        item.innerHTML = `
            <div class="trendings__content-tags">
                <p class="trendings-tags"></p>
            </div>
        `;
        container.appendChild(item)
    }
}
createElements()