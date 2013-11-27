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
	reader.onload = function(e) {
		var img = document.createElement('img');
		img.src = e.target.result;
		document.getElementById('viewer').insertBefore(img);
	};

	reader.readAsDataURL(file);
}

function handleVideoSelect (evt) {
	var file = evt.target.files[0];
	var reader = new FileReader();
	reader.onloadend = function (aFile) {
			return function(e) {
			console.log(e);
			var vid = document.createElement('video');
			var vidSrc = document.createElement('source');
			vid.appendChild(vidSrc);
			document.getElementById('viewer').appendChild(vid);
			vid.onerror = function (error) {
				console.log(error);
			};
			vidSrc.type = aFile.type;
			vidSrc.src = e.target.result;
		};
	}(file);
	
	reader.readAsDataURL(file);
}

document.getElementById('camera').addEventListener('change', handleImageSelect, false);
document.getElementById('camcorder').addEventListener('change', handleVideoSelect, false);