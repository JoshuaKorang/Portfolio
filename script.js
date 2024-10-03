// JavaScript to implement smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Loading Projects dynamically with clickable titles
const projects = [
    {
        title: "Web-Based Roleplaying Game 🎮",
        description: "A web-based role-playing game where you can battle monsters, purchase weapons, and explore a dynamic world of adventure.",
        link: "https://github.com/JoshuaKorang/RolePlayingGame"
    },
    {
        title: "🎵 Web-Based Music Player 🎧",
        description: "A sleek, web-based interactive music player",
        link: "https://github.com/JoshuaKorang/MusicPlayer"
    },
    {
        title: "CalorieCounter 🍎",
        description: "A comprehensive tool for tracking your nutrition and fitness journey.",
        link: "https://github.com/JoshuaKorang/CalorieCounter"
    },
    {
        title: "Organize Downloads Folder Script 📁",
        description: "A dynamic Python script to help you keep your Downloads folder clean and organized. The script automatically categorizes and moves files into respective folders based on file type.",
        link: "https://github.com/JoshuaKorang/OrganizeDownloadsFolder"
    },
    {
        title: "Movie Recommendation System🎞️",
        description: "Using machine learning, the system utilizes the MovieLens dataset in order to make a recommendation for a user.",
        link: "https://github.com/JoshuaKorang/MovieRecommendationSystem"
    }
];

function loadProjects() {
    const container = document.getElementById('projects-container');
    if (container) {
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');

            // Create the clickable title as an anchor tag
            const title = document.createElement('h2');
            const link = document.createElement('a');
            link.href = project.link;
            link.target = "_blank";
            link.textContent = project.title;
            title.appendChild(link);
            projectCard.appendChild(title);

            const description = document.createElement('p');
            description.textContent = project.description;
            projectCard.appendChild(description);

            if (project.image) {
                const img = document.createElement('img');
                img.src = project.image;
                img.alt = project.title;
                img.loading = "lazy"; // Lazy loading for project image
                projectCard.appendChild(img);
            }

            if (project.video) {
                const video = document.createElement('video');
                video.src = project.video;
                video.controls = true;
                projectCard.appendChild(video);
            }

            container.appendChild(projectCard);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Load projects dynamically
    loadProjects();

    // Slider functionality
    const slider = document.querySelector('.skills-slider');
    if (slider) {
        const slides = document.querySelectorAll('.slide');
        if (slides.length > 0) {
            const totalSlides = slides.length;
            const slideWidth = slides[0].clientWidth + 40; // Slide width + margin (20px each side)

            // Clone all slides to create a continuous effect
            for (let i = 0; i < totalSlides; i++) {
                const cloneStart = slides[i].cloneNode(true);
                const cloneEnd = slides[i].cloneNode(true);
                slider.appendChild(cloneEnd);  // Append to end
                slider.insertBefore(cloneStart, slider.firstChild);  // Append to start
            }

            let position = -slideWidth * totalSlides; // Start position at first clone
            slider.style.transform = `translateX(${position}px)`; // Update initial position

            let lastTimestamp = 0;

            function slide(timestamp) {
                if (!lastTimestamp) lastTimestamp = timestamp;
                const elapsed = timestamp - lastTimestamp;

                if (elapsed > 16) { // approximately 60 frames per second
                    position -= 1; // Adjust the speed as needed
                    lastTimestamp = timestamp;

                    if (Math.abs(position) >= slideWidth * (totalSlides * 2)) {
                        position = -slideWidth * totalSlides; // Reset to initial clone position
                    }

                    slider.style.transform = `translateX(${position}px)`;
                }

                requestAnimationFrame(slide);
            }

            requestAnimationFrame(slide);
        }
    }
});