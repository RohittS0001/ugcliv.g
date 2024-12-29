// Function to add uploaded content to the gallery
function addToGallery(fileURL, description) {
    const gallery = document.querySelector('.gallery');
    const newItem = document.createElement('div');
    newItem.classList.add('portfolio-item');

    let media;

    // Create either an image or video based on the uploaded content type
    if (fileURL.includes('video')) {
        media = document.createElement('video');
        media.src = fileURL;
        media.alt = description;
        media.controls = true; // Add controls for the video
        media.setAttribute('muted', 'true'); // Mute the video to prevent autoplay sound

        // Play/pause logic
        const overlay = document.createElement('div');
        overlay.classList.add('video-overlay');
        overlay.innerHTML = '<span class="play-icon">&#9658;</span>';
        newItem.appendChild(overlay);
        overlay.addEventListener('click', () => {
            if (media.paused) {
                media.play();
                overlay.classList.add('active');
            } else {
                media.pause();
                overlay.classList.remove('active');
            }
        });
    } else {
        media = document.createElement('img');
        media.src = fileURL;
        media.alt = description;
    }

    newItem.appendChild(media);

    const caption = document.createElement('p');
    caption.textContent = description;
    newItem.appendChild(caption);

    gallery.appendChild(newItem);
}

// Handle form submission for file uploads
document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const file = document.getElementById('file').files[0];
    const description = document.getElementById('description').value;

    const reader = new FileReader();

    reader.onload = function(e) {
        const fileURL = e.target.result;
        addToGallery(fileURL, description);
    };

    // Ensure that file is video or image
    if (file && (file.type.startsWith('video') || file.type.startsWith('image'))) {
        reader.readAsDataURL(file); // Read the file and get its data URL
    } else {
        alert("Please upload a valid image or video.");
    }

    // Reset the form after upload
    document.getElementById('upload-form').reset();
});
