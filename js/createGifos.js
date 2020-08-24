let myGifsArray = [];

if (localStorage.getItem("myGifs")) {
  myGifsArray = JSON.parse(localStorage.getItem("myGifs"));
}

// create gif
function captureGif() {
	// get element of instructions for create a gif
	document.querySelector('.create__gif').style.display = 'none';

	// get element of capture gif
	document.querySelector('.capture-gif').style.display = 'grid';
	createFunction();
}

const API_KEY = 'ebk0jnF3WxzqiudF7E9fiRMumlMantoI';
const URL_UPLOAD = 'https://upload.giphy.com/v1/gifs';
const URL_ID_GIF = 'http://api.giphy.com/v1/gifs';

function createFunction() {

	navigator.mediaDevices
		.getUserMedia({
			video: {
				width: { ideal: 832},
				height: { ideal: 434},
			},
			audio: false,
		})
		.then((stream) => {
			document.getElementById('video').srcObject = stream;
		});
}

let recorder;
let gif_grabado;

// CTA - CREATE GIF
document.getElementById('start').onclick = function () {
	document.querySelector('.capture-gif-btn').style.setProperty('justify-content','space-between');
	// change title window
	document.querySelector('.capture-title-text').innerHTML = 'Capturando Tu Guifo';
	// activate croonometro
	document.querySelector('.capture-gif-btn-time').style.display = 'flex';
	// disable capture button
	document.querySelector('.capture-gif-btn-capture').style.display = 'none';
	// activate stop button
	document.querySelector('.capture-gif-btn-stop').style.display = 'flex';

	this.disabled = true;

	navigator.mediaDevices
		.getUserMedia({
			video: {
				width: { ideal: 832},
				height: { ideal: 434},
			},
			audio: false,
		})
		.then(function (stream) {
			document.getElementById('video').srcObject = stream;

			recorder = RecordRTC(stream, {
				type: 'gif',
				quality: 10,
				width: 832,
				height: 434,
				hidden: 240,
				frameRate: 1,
			});

			recorder.startRecording();
			document.getElementById('stop').disabled = false;
		});
};

// CTA - STOP GIF
document.getElementById('stop').onclick = function () {
	// change title window
	document.querySelector('.capture-title-text').innerHTML = 'Vista Previa';
	// active wrap of button upload and repeat gif
	document.querySelector('.capture-gif-btn-wrap').style.display = 'flex';
	// hide video
	document.querySelector('.video').style.display = 'none';
	// disable stop button
	document.querySelector('.capture-gif-btn-stop').style.display = 'none';
	// activate Upload button
	document.querySelector('.capture-gif-btn-upload').style.display = 'flex';
	// activate Repeat button
	document.querySelector('.capture-gif-btn-repeat').style.display = 'flex';
	// activate img gif
	document.querySelector('.gif').style.display = 'flex';

	document.getElementById('video').srcObject = null;

	this.disabled = true;

	recorder.stopRecording(function (blob) {
		document.getElementById('start').disabled = false;

		let form = new FormData();
		form.append('file', recorder.getBlob(), 'myGif.gif');

		document.querySelector('.gif').src = URL.createObjectURL(recorder.getBlob());
		gif_grabado = URL.createObjectURL(recorder.getBlob());

		// CTA - UPLOAD GIF
		document.getElementById('upload').onclick = function () {
			// change title window
			document.querySelector('.capture-title-text').innerHTML = 'Subiendo Guifo';
			// activate Cancel button
			document.querySelector('.capture-gif-btn-cancel').style.display = 'flex';
			document.querySelector('.wrap-upload-gif').style.display = 'flex';
			document.querySelector('.capture-gif-btn-upload').style.display = 'none';
			document.querySelector('.capture-gif-btn-repeat').style.display = 'none';
			document.querySelector('.capture-gif-btn-time').style.display = 'none';
			document.querySelector('.gif').style.display = 'none';

			fetch('https://upload.giphy.com/v1/gifs?api_key=ebk0jnF3WxzqiudF7E9fiRMumlMantoI', {
				method: 'POST',
				body: form,
			})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				let gifId = data.data.id;
				getGifDetails(gifId);
				// render succesfull upload gif
				setTimeout(function(){
					document.querySelector('.capture-gif-btn-cancel').style.display = 'none';
					document.querySelector('.wrap-upload-gif').style.display = 'none';
					document.querySelector('.sucessfull-gif').style.display = 'flex';
					document.querySelector('.capture-gif-btn').style.display = 'none';
					let section = document.querySelector('.capture-gif');
					section.style.width = '721px';
					section.style.height = '391px';
					section.style.setProperty('grid-template-rows','25px 10px 435px');
					// get property content camara
					let property = document.querySelector('.capture-gif-camara');
					property.style.width = '660px';
					property.style.height = '390px';
					property.style.margin = '29px 27px 0 27px';
					property.style.setProperty('box-shadow','none');
					property.style.setProperty('border','none');
					property.style.setProperty('background','none');
					// change title window
					document.querySelector('.capture-title-text').innerHTML = 'Guifo Subido Con Éxito';
					// activate img gif
					let element = document.querySelector('.gif');
					element.style.display = 'flex';
					element.style.width = '365px';
					element.style.height = '190px';		
				}, 3000);
			})
			.catch(function (error) {
				console.error(error);
			});
		}
		
	});
};

async function urlGif(id) {
	let response = await fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=ebk0jnF3WxzqiudF7E9fiRMumlMantoI`);
	let data = await response.json();
	let urlImg = await data.data.images.downsized_large.url;
	console.log(urlImg)
	return urlImg;
}

async function getGifDetails(id) {
	const gifURL = await urlGif(id);
	myGifsArray.push(gifURL);
	localStorage.setItem("myGifs", JSON.stringify(myGifsArray));
}

document.getElementById('download-gif').addEventListener('click', function() {
	let link = document.createElement('a');
	link.href = URL.createObjectURL(recorder.getBlob());
	link.setAttribute('download', 'my_gif');
	document.body.appendChild(link);
	link.click();
	link.remove();
})

// guardar gif     
window.onload = renderMyGif;

function renderMyGif() {
	let savedGifs = localStorage.getItem("myGifs");
	savedGifs = JSON.parse(savedGifs);
	for(let i = 0; i < savedGifs.length; i++ ) {
	  let contenedor = document.querySelector(".container-myGifos");
	  console.log(contenedor)
	  let myGifCont = document.createElement("div");
	  myGifCont.className = "new-gif";
	  let image = document.createElement("img");
	  image.src = savedGifs[i];
	  myGifCont.appendChild(image);
	  contenedor.appendChild(myGifCont);
	}
}

init();

function init(){
    document.querySelector(".start").addEventListener("click",cronometrar);
    document.querySelector(".stop").addEventListener("click", stop);
    h = 0;
    m = 0;
    s = 0;
    document.getElementById("hms").innerHTML="00:00:00";
}

function cronometrar(){
    write();
    id = setInterval(write, 1000);
    document.querySelector(".start").removeEventListener("click", cronometrar);
}

function write(){
    let hAux, mAux, sAux;
    s++;
    if (s>59){m++;s=0;}
    if (m>59){h++;m=0;}
    if (h>24){h=0;}

    if (s<10){sAux="0"+s;}else{sAux=s;}
    if (m<10){mAux="0"+m;}else{mAux=m;}
    if (h<10){hAux="0"+h;}else{hAux=h;}

    document.getElementById("hms").innerHTML = hAux + ":" + mAux + ":" + sAux; 
}

function stop(){
    clearInterval(id);
    document.querySelector(".start").addEventListener("click",cronometrar);
}