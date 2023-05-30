// Get the canvas element and its 2D context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Array of particle image paths
var particleImages = [
    "image/texture00.png",
    "image/texture01.png",
    "image/texture02.png",
];

// Array to store preloaded particle images
var particlesImages = [];

// Particle constructor
function Particle(x, y, size, speedX, speedY, image) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
    this.image = image;
}

// Update method for Particle prototype
Particle.prototype.update = function() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.size -= 0.1; // Shrink the particle size over time

    if (this.size <= 0) {
        // Remove the particle from the array
        particles.splice(particles.indexOf(this), 1);
    }
};

// Draw method for Particle prototype
Particle.prototype.draw = function() {
    ctx.drawImage(this.image, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
};

// Array to store particles
var particles = [];

// Load particle images
function loadParticleImages(callback) {
    var loadedCount = 0;

    // Preload each particle image
    for (var i = 0; i < particleImages.length; i++) {
        var image = new Image();
        image.src = particleImages[i];
        image.onload = function() {
            loadedCount++;

            // Check if all images are loaded
            if (loadedCount === particleImages.length) {
                callback();
            }
        };

        // Add the loaded image to the array
        particlesImages.push(image);
    }
}

// Animation loop
function animate() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create new particle
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var size = Math.random() * 20 + 5;
    var speedX = Math.random() * 2 - 1;
    var speedY = Math.random() * 2 - 1;
    var image = particlesImages[Math.floor(Math.random() * particlesImages.length)];
    particles.push(new Particle(x, y, size, speedX, speedY, image));

    // Update and draw particles
    for (var i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }

    // Request next animation frame
    requestAnimationFrame(animate);
}

// Wait for the particle images to load
loadParticleImages(function() {
    // Start the animation loop after all images are loaded
    animate();
});