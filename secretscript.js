document.addEventListener('DOMContentLoaded', function() {
    const fishContainer = document.getElementById('fish-container');
    const fishImages = ['Media/fish1.png', 'Media/fish2.png', 'Media/fish3.png'];
    const numFish = 50;

    class Fish {
        constructor() {
            this.fish = document.createElement('img');
            this.fish.src = fishImages[Math.floor(Math.random() * fishImages.length)];
            this.fish.className = 'fish';
            this.fish.style.left = `${Math.random() * window.innerWidth}px`;
            this.fish.style.top = `${Math.random() * window.innerHeight}px`;
            fishContainer.appendChild(this.fish);

            this.speed = 50 + Math.random() * 100; // pixels per second
            this.angle = Math.random() * 2 * Math.PI;
            this.lastTime = performance.now();
        }

        update(currentTime) {
            const delta = (currentTime - this.lastTime) / 1000; // seconds
            this.lastTime = currentTime;

            // Calculate new position
            let x = parseFloat(this.fish.style.left) + Math.cos(this.angle) * this.speed * delta;
            let y = parseFloat(this.fish.style.top) + Math.sin(this.angle) * this.speed * delta;

            // Bounce off edges
            if (x < 0 || x > window.innerWidth - this.fish.width) {
                this.angle = Math.PI - this.angle;
                x = Math.max(0, Math.min(x, window.innerWidth - this.fish.width));
            }
            if (y < 0 || y > window.innerHeight - this.fish.height) {
                this.angle = -this.angle;
                y = Math.max(0, Math.min(y, window.innerHeight - this.fish.height));
            }

            this.fish.style.left = `${x}px`;
            this.fish.style.top = `${y}px`;

            // Flip horizontally depending on direction
            this.fish.style.transform = `scaleX(${Math.cos(this.angle) < 0 ? -1 : 1})`;
        }
    }

    const fishes = [];
    for (let i = 0; i < numFish; i++) {
        fishes.push(new Fish());
    }

    function animate(time) {
        fishes.forEach(fish => fish.update(time));
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
});