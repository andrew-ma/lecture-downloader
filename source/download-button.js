function getVideoDownloadURL() {
	const url = location.href;
	const re = /^([^:]+:\/\/[^/]+).+id=(.+)$/;
	const matches = url.match(re);
	if (matches === null) {
		return null;
	}

	const domain = matches[1];
	const video_guid = matches[2];
	const video_download_url = `${domain}/Panopto/Podcast/Syndication/${video_guid}.mp4`;
	console.info(video_download_url);
	return video_download_url;
}

function getVideoFilename() {
	let filename = document.title;
	filename = filename.replaceAll(/[()]/g, '');
	filename = filename.replaceAll(' ', '_');
	filename = filename.replaceAll(/[^\w-]/gi, '');
	filename += '.mp4';
	console.info(filename);
	return filename;
}

function addDownloadButtonElement(download_url, save_filename) {
	const button = document.createElement('button');
	button.id = 'video-download-button';
	button.addEventListener('click', () => {
		// Copy video filename to clipboard
		navigator.clipboard.writeText(save_filename).then(() => {
			console.info('Copied video filename to clipboard');

			// Open video download url in new tab
			window.open(download_url, '_blank');
		}, error => {
			console.error(`Failed to write clipboard: ${error}`);

			// Open video download url in new tab
			window.open(download_url, '_blank');
		});
	});

	const button_text = document.createTextNode(save_filename);

	button.append(button_text);
	document.body.insertBefore(button, document.body.firstChild);
}

const video_download_url = getVideoDownloadURL();

if (video_download_url !== null) {
	const video_filename = getVideoFilename();
	addDownloadButtonElement(video_download_url, video_filename);
}
