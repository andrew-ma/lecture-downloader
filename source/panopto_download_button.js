function getVideoDownloadURL()
{
    var url = location.href;
    var re = /^([^:]+[:][/][/][^/]+).+id=(.+)$/;
    var matches = url.match(re);
    if (matches === null) {
        return null;
    }
    var panopto_domain = matches[1];
    var video_guid = matches[2];
    var video_download_url = `${panopto_domain}/Panopto/Podcast/Syndication/${video_guid}.mp4`
    console.info(video_download_url);
    return video_download_url;
}


function getVideoFilename()
{
    var filename = document.title;
    filename = filename.replaceAll(/[()]/g, "");
    filename = filename.replaceAll(" ", "_");
    filename = filename.replaceAll(/[^a-z0-9_-]/ig, "");
    filename = filename + ".mp4";
    console.info(filename);
    return filename;
}


function addDownloadButtonElement(download_url, save_filename)
{
    var button = document.createElement("button");
    button.id = "video_download_button";
    button.addEventListener("click", function ()
    {
        // Copy video filename to clipboard
        navigator.clipboard.writeText(save_filename).then(function ()
        {
            console.info(`Copied video filename to clipboard`);
        }, function (err)
        {
            console.error(`Failed to write clipboard: ${err}`);
        })
        
        // Open video download url in new tab
        window.open(download_url, "_blank");
    });

    var button_text = document.createTextNode(save_filename);

    button.appendChild(button_text);
    document.body.insertBefore(button, document.body.firstChild);
}

var video_download_url = getVideoDownloadURL();

if (video_download_url !== null) {
    var video_filename = getVideoFilename();
    addDownloadButtonElement(video_download_url, video_filename);
}