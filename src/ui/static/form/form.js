const uploadImage = () => {
    const request = new XMLHttpRequest();
    const progressElement = document.getElementById('progress-bar');
    const input = document.getElementById('image-upload');
    const file = input.files.length ? input.files[0] : null;

    if (file) {
        const data = new FormData();
        data.append('files', file, file.name);

        request.onprogress = (event) => {
            if (event.lengthComputable) {
                const percent = Math.floor(event.loaded / event.total) * 100;
                progressElement.style.width = `${percent}%`;
            }
        };

        request.open('POST', '/gallery', true);
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                progressElement.style.width = '0';
                console.log('SUCCESS!');
            }
        };
        request.send(data);
    }
};

window.uploadImage = uploadImage;