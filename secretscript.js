document.addEventListener('DOMContentLoaded', function() {
    const fishContainer = document.getElementById('fish-container');
    const fishImages = ['Media/fish1.png', 'Media/fish2.png', 'Media/fish3.png']; // Add your fish image filenames
    const numFish = 10; // Number of fish to create

    function createFish() {
        const fish = document.createElement('img');
        fish.src = fishImages[Math.floor(Math.random() * fishImages.length)];
        fish.className = 'fish';
        fish.style.left = `${Math.random() * 90}vw`; // Ensure initial position is within bounds
        fish.style.top = `${Math.random() * 90}vh`;
        fishContainer.appendChild(fish);
        return fish;
    }

    function moveFish(fish) {
        const fishRect = fish.getBoundingClientRect();
        const maxX = window.innerWidth - fishRect.width;
        const maxY = window.innerHeight - fishRect.height;

        let newX = Math.random() * maxX;
        let newY = Math.random() * maxY;

        // Ensure the fish stays within the screen boundaries
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        fish.style.transform = `translate(${newX}px, ${newY}px)`;

        // Flip the fish horizontally if moving right
        if (newX > parseFloat(fish.style.left)) {
            fish.style.transform += ' scaleX(-1)';
        } else {
            fish.style.transform += ' scaleX(1)';
        }

        fish.style.left = `${newX}px`;
        fish.style.top = `${newY}px`;
    }

    // Create initial fish
    for (let i = 0; i < numFish; i++) {
        const fish = createFish();
        setInterval(() => moveFish(fish), 3000 + Math.random() * 2000);
    }
});
