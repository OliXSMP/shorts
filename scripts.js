// scripts.js

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("shortsContainer");
    const shortItems = document.querySelectorAll(".short-item");
    let currentVideoIndex = 0;

    const totalVideos = 5; // Adjust this variable to the total number of videos you have

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5, // Adjust the threshold as needed
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    function handleIntersection(entries, observer) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Video is in view
                setTimeout(() => {
                    entry.target.play();
                }, 200); // Add a small delay (200 milliseconds) before playing
            } else {
                // Video is out of view
                entry.target.pause();
            }
        });
    }

    for (let i = 1; i <= totalVideos; i++) {
        const shortItem = document.createElement("div");
        shortItem.className = "short-item";

        const shortVideo = document.createElement("video");
        shortVideo.className = "short-video";
        shortVideo.src = `video${i}.mp4`; // Adjust the path to your video file
        shortVideo.loop = true; // Add loop attribute

        const playButton = document.createElement("button");
        playButton.className = "play-button";
        playButton.innerHTML = "&#9654;"; // Play icon

        const audioBar = document.createElement("input");
        audioBar.type = "range";
        audioBar.min = 0;
        audioBar.max = 1;
        audioBar.step = 0.01;
        audioBar.value = shortVideo.volume;
        audioBar.className = "audio-bar";
        audioBar.style.display = "none";

        // Hide play button initially
        playButton.style.display = "none";

        // Show play button and audio bar on hover
        shortItem.addEventListener("mouseenter", function () {
            playButton.style.display = "block";
            audioBar.style.display = "block";
        });

        // Hide play button and audio bar when not hovering
        shortItem.addEventListener("mouseleave", function () {
            playButton.style.display = "none";
            audioBar.style.display = "none";
        });

        // Play/pause functionality
        playButton.addEventListener("click", function () {
            if (shortVideo.paused) {
                shortVideo.play();
            } else {
                shortVideo.pause();
            }
        });

        // Volume control
        audioBar.addEventListener("input", function () {
            shortVideo.volume = audioBar.value;
        });

        shortItem.appendChild(shortVideo);
        shortItem.appendChild(playButton);
        shortItem.appendChild(audioBar);

        container.appendChild(shortItem);

        // Observe each video
        observer.observe(shortVideo);
    }

    window.addEventListener("keydown", function (event) {
        if (event.key === "ArrowDown") {
            event.preventDefault(); // Prevent the default scroll behavior

            currentVideoIndex++;

            if (currentVideoIndex >= shortItems.length) {
                currentVideoIndex = shortItems.length - 1;
            }

            const nextVideo = shortItems[currentVideoIndex];
            container.scrollTo({
                top: nextVideo.offsetTop,
                behavior: "smooth",
            });
        }
    });

    // Autoplay the first video
    shortItems[0].querySelector(".short-video").play();
});
