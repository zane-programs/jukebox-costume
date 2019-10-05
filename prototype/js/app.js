(window => {
	const socket = io("https://api.zanestjohn.com/spotify");

	let currentSong;

	const smartList = arr => {
		let stringToReturn = "";
		if (typeof arr === "undefined") {
			throw new Error("Missing array");
		} else {
			if (arr.length === 0) {
				throw new Error("Empty array");
			} else if (arr.length === 1) {
				stringToReturn = arr[0];
			} else if (arr.length === 2) {
				stringToReturn = arr[0] + " and " + arr[1];
			} else {
				for (let i = 0; i < arr.length; i++) {
					if (i + 1 === arr.length) {
						stringToReturn += "and " + arr[i];
					} else {
						stringToReturn += arr[i] + ", ";
					}
				}
			}
		}
		return stringToReturn;
	};

	const handlePlayingSong = data => {
		if (data.playing === null) {
			// if nothing playing
		} else {
			let song = data.item;

			if (song !== currentSong) {
				currentSong = song;
				document.querySelector("h1.jukebox-song-title").innerText = `"${song.name}"`;
				document.querySelector("div.jukebox-song-artist").innerText = song.album.artists[0].name;
				document.querySelector("div.jukebox-song-album").innerText = song.album.name;
				document.querySelector("div.jukebox-album-cover img").src = song.album.images[1].url;
			}
		}
	};

	const hideLoadingOverlay = () => {

	};

	const pageLoadHandler = async () => {
		let currentSong = await fetch("https://api.zanestjohn.com/spotify/current");
		handlePlayingSong(currentSong);

		hideLoadingOverlay();
	};

	socket.on("playing-song", handlePlayingSong);

	document.addEventListener('DOMContentLoaded', pageLoadHandler);
})(window);