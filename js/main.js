// Event to input search - home
document.querySelector('.text').addEventListener('click', changeColorBtn);

function changeColorBtn(e) {
    e.preventDefault();
    let color = document.querySelector('.submit');
    color.style.background = '#F7C9F3';
    color.style.border = '1px solid black';
    let loupe = document.querySelector('#loupe');
    loupe.src = '/assets/lupa.svg'
    let textBtn = document.querySelector('#btn-search');
    textBtn.style.color = '#110038';
}