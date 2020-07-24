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

// Event to input search - home ---------------------------------------------
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

// dropdown --------------------------------------------------------
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
