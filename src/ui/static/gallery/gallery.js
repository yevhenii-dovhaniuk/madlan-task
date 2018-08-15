const fetchGalleryItems = () => {
    try {
        return fetch('/gallery').then(r => r.json());
    } catch (e) {
        console.log('Error while fetching: ', e);
        return Promise.resolve({total: 0, images: []});
    }
};

const renderGallery = (galleryData) => {
    const galleryContainer = document.getElementById('gallery');
    const totalElement = document.getElementById('gallery-count');
    const domFragment = document.createDocumentFragment();
    const {total, images} = galleryData;
    images.forEach(item => {
        const element = document.createElement('img');
        element.src = item.src;
        element.alt = 'gallery image';
        element.title = item.title;
        domFragment.appendChild(element);
    });
    galleryContainer.innerHTML = '';
    galleryContainer.appendChild(domFragment);
    totalElement.innerText = total;
};

const initGallery = () => {
    fetchGalleryItems().then(galleryData => renderGallery(galleryData));
};

(function () {
    initGallery();
})();

window.initGallery = initGallery;