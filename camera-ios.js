if (!!(window.File && window.FileReader && window.FileList && window.blob)) {
	alert('File APIs are not fully supported.');
};

function handleImage (file) {
	console.log(file);
	var reader = new FileReader();
	reader.onload = (function (aFile) {
		return function (e) {
			var img = document.createElement('img');
			img.src = e.target.result;
			console.log(img.src);
			document.querySelector('#viewer').appendChild(img);
		}
	})(file);

	reader.readAsDataURL(file);
}

function handleImageSelect(evt) {
	var file = evt.target.files[0];

	var reader = new FileReader();

	// Closure to capture the file information.
	reader.onload = (function(theFile) {
		return function(e) {
			// Render thumbnail.
			var img = document.createElement('img');
			img.src = e.target.result;
			document.getElementById('viewer').insertBefore(img, null);
		};
	})(file);

	// Read in the image file as a data URL.
	reader.readAsDataURL(file);
}

function handleVideoSelect (evt) {
	
}
document.getElementById('camera').addEventListener('change', handleImageSelect, false);