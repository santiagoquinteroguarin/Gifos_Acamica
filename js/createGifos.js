// create gif
function captureGif() {
	// get element of instructions for create a gif
	let getElementCreate = document.querySelector('.create__gif');
	getElementCreate.style.display = 'none';

	// get element of capture gif
	let getElementCapture = document.querySelector('.capture-gif');
	getElementCapture.style.display = 'grid';
	createFunction();
}

const API_KEY = 'ebk0jnF3WxzqiudF7E9fiRMumlMantoI';
const URL_UPLOAD = 'http://upload.giphy.com/v1/gifs';

function createFunction() {
	// document.querySelector('.gifCreation').classList.toggle('showCamera');
	// document.querySelector('.alert').classList.toggle('hiddenAlert');

	navigator.mediaDevices
		.getUserMedia({
			video: {
				width: { ideal: 400 },
				height: {
					ideal: 200,
				},
			},
			audio: false,
		})
		.then((stream) => {
			document.getElementById('video').srcObject = stream;
		});
}

let recorder;
let gif_grabado;

document.getElementById('start').onclick = function () {
	this.disabled = true;

	navigator.mediaDevices
		.getUserMedia({
			video: {
				width: { ideal: 400 },
				height: {
					ideal: 200,
				},
			},
			audio: false,
		})
		.then(function (stream) {
			document.getElementById('video').srcObject = stream;

			recorder = RecordRTC(stream, {
				type: 'gif',
				quality: 10,
				width: 400,
				height: 200,
				hidden: 240,
				frameRate: 1,
			});

			recorder.startRecording();
			document.getElementById('stop').disabled = false;
		});
};

document.getElementById('stop').onclick = function () {
	document.getElementById('video').srcObject = null;

	this.disabled = true;

	recorder.stopRecording(function (blob) {
		document.getElementById('start').disabled = false;

		let form = new FormData();
		form.append('file', recorder.getBlob(), 'myGif.gif');

		document.querySelector('.gif').src = URL.createObjectURL(recorder.getBlob());
		gif_grabado = URL.createObjectURL(recorder.getBlob());

		fetch('https://upload.giphy.com/v1/gifs?api_key=ebk0jnF3WxzqiudF7E9fiRMumlMantoI', {
			method: 'POST',
			body: form,
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				let gifId = data.data.id;
				console.log(gifId)
				getGifDetails(gifId);
			})
			.catch(function (error) {
				console.error(error);
			});
	});
};

function getGifDetails(id) {
	fetch(`http://api.giphy.com/v1/gifs/${id}?api_key=ebk0jnF3WxzqiudF7E9fiRMumlMantoI`)
		.then((response) => response.json())
		.then((data) => {
			console.log(data)
			const gifURL = data.data.url;
		});
}
