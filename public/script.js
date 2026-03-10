// script.js

// Function to handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');

    // Manage loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Generating...';

    try {
        // Call the /generate API endpoint
        const response = await fetch('/generate', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        displayGeneratedClips(data.clips);
    } catch (error) {
        console.error('Error during form submission:', error);
    } finally {
        // Reset loading state
        submitButton.disabled = false;
        submitButton.textContent = 'Generate';
    }
}

// Function to display generated clips in a grid
function displayGeneratedClips(clips) {
    const grid = document.getElementById('generated-clips-grid');
    grid.innerHTML = '';

    clips.forEach(clip => {
        const clipElement = document.createElement('div');
        clipElement.className = 'clip';
        clipElement.innerHTML = `
            <video src="${clip.url}" controls></video>
            <a href="${clip.url}" download="${clip.title}.mp4">Download ${clip.title}</a>
        `;
        grid.appendChild(clipElement);
    });
}

// Event listener for the form submission
const form = document.getElementById('clip-form');
if (form) {
    form.addEventListener('submit', handleFormSubmit);
}