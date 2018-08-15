const uploadImage = () => {
    const request = new XMLHttpRequest();
    const progressElement = document.getElementById('progress-bar');
    const input = document.getElementById('image-upload');
    const file = input.files.length ? input.files[0] : null;

    progressElement.style.display = 'block';

    if (file) {
        const data = new FormData();
        data.append('files', file, file.name);
        request.upload.onprogress = (event) => {
            handleProgress(progressElement, event);
        };
        request.open('POST', '/gallery', true);
        handleRequestCompleted(request, progressElement);
        request.send(data);
    }
};

const handleProgress = (progressElement, progressEvent) => {
    if (progressEvent.lengthComputable) {
        const percent =(progressEvent.loaded / progressEvent.total) * 100;
        progressElement.style.width = `${percent.toFixed(0)}%`;
    }
};

const handleRequestCompleted = (request, progressElement) => {
    const uploadErrorImgRef = document.getElementById('upload-error-img');
    const errorTextRef = document.getElementById('error-text');
    const uploadCompleteImgRef = document.getElementById('upload-complete-img');

    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status === 500) {
                console.log(request.responseText);
                showError(uploadErrorImgRef, errorTextRef, request.responseText);
                hideCompleted(uploadCompleteImgRef, progressElement);
                setTimeout(() => hideError(uploadErrorImgRef, errorTextRef), 4000);
                return;
            }
            showCompleted(uploadCompleteImgRef);
            setTimeout(() => {
                hideCompleted(uploadCompleteImgRef, progressElement);
            }, 2000);
            initGallery();
        }
    };
};

const showError = (uploadErrorImgRef, errorTextRef, errorText) => {
    errorTextRef.innerText = errorText;
    uploadErrorImgRef.style.opacity = '1';
    uploadErrorImgRef.style.width = 'auto';
};

const hideError = (uploadErrorImgRef, errorTextRef) => {
    errorTextRef.innerText = '';
    uploadErrorImgRef.style.opacity = '0';
    uploadErrorImgRef.style.width = '0';
};

const showCompleted = (uploadCompleteImgRef) => {
    uploadCompleteImgRef.style.opacity = '1';
    uploadCompleteImgRef.style.width = 'auto';
};
const hideCompleted = (uploadCompleteImgRef, progressElement) => {
    uploadCompleteImgRef.style.opacity = '0';
    uploadCompleteImgRef.style.width = '0';
    progressElement.style.width = '0';
    progressElement.style.display = 'none';
};

window.uploadImage = uploadImage;