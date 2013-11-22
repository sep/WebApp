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
	var file = evt.target.files[0];
	var reader = new FileReader();
	reader.onload = (function(theFile) {
		return function(e) {
			// Render thumbnail.
			var vid = document.createElement('video');
			document.getElementById('viewer').insertBefore(vid, null);
			vid.onerror = function (error) {
				console.log(error);
				alert('There was an error adding the video.');
			};
			vid.src = e.target.result;
		};
	})(file);

	reader.readAsDataURL(file);
}

document.getElementById('camera').addEventListener('change', handleImageSelect, false);
document.getElementById('camcorder').addEventListener('change', handleVideoSelect, false);