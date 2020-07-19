// get values buttons for change themes
let changeThemeLigth = document.querySelector('.change_theme-light');
let changeThemeDark = document.querySelector('.change_theme-dark');

// change theme to ligth
changeThemeLigth.addEventListener('click', function() {
    document.documentElement.setAttribute('data-theme', 'light');
    // change assets custom
    changeCustom();
})

// change theme to dark
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
