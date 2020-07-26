// get values buttons for change themes
let changeThemeLigth = document.querySelector('.change_theme-light');
let changeThemeDark = document.querySelector('.change_theme-dark');

// CTA - change theme to ligth
changeThemeLigth.addEventListener('click', function() {
    document.documentElement.setAttribute('data-theme', 'light');
    // change assets custom
    changeCustom();
})

// CTA - change theme to dark
changeThemeDark.addEventListener('click', function() {
    document.documentElement.setAttribute('data-theme', 'dark');
    // change assets custom
    changeCustom();
})

// render logo for themes
function changeCustom() {
    let element = document.getElementById('html').attributes;
    if(element[2].value === 'dark') {
        // change logo to dark
        let logo = document.querySelector('.img-logo')
        logo.src = '/assets/gifOF_logo_dark.png';
        // change arrow down themes
        let arrowDown = document.getElementById('arrow');
        arrowDown.src = '/assets/forward.svg';
    } else {
        // change logo to ligth
        let logo = document.querySelector('.img-logo')
        logo.src = '/assets/gifOF_logo.png';
        // change arrow down themes
        let arrowDown = document.getElementById('arrow');
        arrowDown.src = '/assets/dropdown.svg';
    }
}

changeCustom();

// CTA - Event to input search - home ---------------------------------------------
document.querySelector('.text').addEventListener('click', changeColorBtn);

// CTA - Change loupe and color button search
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

// CTA - dropdown --------------------------------------------------------
function dropDown() {
    document.getElementById("dropdown").classList.toggle("show");
}

function keyword() {
    document.getElementById("keywordId").classList.toggle("showK");
}

window.onclick = function (e) {
    let dropdown = document.getElementById("dropdown")
    let keyword = document.getElementById("keywordId")

    // close all
    if (!e.target.matches(".arrow-down") && !e.target.matches('.keywords')) {
        dropdown.classList.remove('show');
        // keyword.classList.remove('showK');
    }

    // close search
    if (e.target.matches('.keywords')) {
        dropdown.classList.remove('show');
    }

    // close dropdown
    if (e.target.matches('.arrow-down')) {
        keyword.classList.remove('showK');
    }
};
