// Get the canvas element and its 2D context


// Array of particle image paths
var particleImages = [
    "image/texture00.png",
    "image/texture01.png",
    "image/texture02.png",
];

// Array to store preloaded particle images
var particleImageDatas = [];

var particleState = 0;
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
    this.size -= 0.01; // Shrink the particle size over time

    if (this.size <= 0) {
        // Remove the particle from the array
        particles.splice(particles.indexOf(this), 1);
    }
};

// Draw method for Particle prototype
Particle.prototype.draw = function() {
    global.c2d.drawImage(this.image, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
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
        particleImageDatas.push(image);
    }
}

// Animation loop
function animate() {
    if(particleState < 2) return;

    // Create new particle
    const x = Math.random() * global.canvas.width;
    const y = Math.random() * global.canvas.height;
    const size = Math.random() * 20 + 25;
    const speedX = Math.random() * 2 - 1;
    const speedY = Math.random() * 2 - 1;
    const image = particleImageDatas[Math.floor(Math.random() * particleImageDatas.length)];
    particles.push(new Particle(x, y, size, speedX, speedY, image));

    // Update and draw particles
    for (var i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }

    // Request next animation frame
    requestAnimationFrame(animate);
}

 // 0: unload, 1: stopped, 2: playing

function playParticles() {
    if(particleState === 2) return;
    if(particleState) {
        particleState = 2;
        animate();
    }
};

function stopParticles() {
    particleState = 1;
};

