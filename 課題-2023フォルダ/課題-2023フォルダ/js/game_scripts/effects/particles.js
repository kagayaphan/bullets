/*
* Particles game effect
*/


// Array to store preloaded particle images
let particleImagesData = [
    GameImages.crab,
    GameImages.octopus,
    GameImages.squid

];

let particleState = false;


class Particle{
    constructor(x, y, size, speedX, speedY, image) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.image = image;

    }
    draw(){
        this.image.Draw(this.x,this.y,true,this.size);
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        this.size -= 0.01; // Shrink the particle size over time

        if (this.size <= 0) {
            // Remove the particle from the array
            particles.splice(particles.indexOf(this), 1);
        }
    }

}


// Array to store particles
let particles = [];

// Animation loop
function animate() {
    if(!particleState) return;

    // Create new particle
    const x = Math.random() * global.canvas.width;
    const y = Math.random() * global.canvas.height;
    const scale = (Math.random() * 20 + 25) * 0.01;
    const speedX = Math.random() * 2 - 1;
    const speedY = Math.random() * 2 - 1;
    const image = particleImagesData[Math.floor(Math.random() * particleImagesData.length)];
    particles.push(new Particle(x, y, scale, speedX, speedY, image));

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }

    // Request next animation frame
    requestAnimationFrame(animate);
}

// turn particles on or off
function toggleParticles() {
    particleState = !particleState;
    if(particleState) {
        animate();
    }
};


