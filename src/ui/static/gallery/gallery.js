const fetchGalleryItems = () => {
    try {
        return fetch('/gallery').then(r => r.json());
    } catch (e) {

    }
};

const renderGallery = async () => {
    const galleryContainer = document.getElementById('gallery');
    const domFragment = document.createDocumentFragment();
    const items = await fetchGalleryItems();
    items.forEach(item => {
        const element = document.createElement('img');
        element.src = item.src;
        element.alt = 'gallery image';
        element.title = item.title;
        domFragment.appendChild(element);
    });
    galleryContainer.appendChild(domFragment);
};

(function () {
    renderGallery();
})();