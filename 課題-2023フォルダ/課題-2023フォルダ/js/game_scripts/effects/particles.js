

const explosions = []; // Array to store active explosions

function Particle(x, y, radius, color, dx, dy, particleType) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = dx;
    this.dy = dy;
    this.particleType = particleType;

    this.update = function() {
        this.x += this.dx;
        this.y += this.dy;
        this.radius -= 0.02;
        // if (this.particleType === 'explosion') {
        //     this.radius -= 0.02;
        // } else if (this.particleType === 'smoke') {
        //     this.radius += 0.02;
        //     // this.color = `rgba(0, 0, 0, ${1 - this.radius / 10})`;
        // }

        this.draw();
    };

    this.draw = function() {
        if (this.radius > 0) {
            global.c2d.save();
            global.c2d.beginPath();
            global.c2d.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            global.c2d.fillStyle = this.color;
            global.c2d.fill();
            global.c2d.closePath();
            global.c2d.restore();
        }
    };
}

function createExplosion(x, y, numParticles) {
    const particles = []; // Array to store particles for this explosion

    for (let i = 0; i < numParticles; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5 + 0.01;
        const dx = Math.cos(angle) * speed;
        const dy = Math.sin(angle) * speed;
        const radius = Math.random() * 5 + 2;
        const color = `hsl(${Math.random() * 360}, 100%, 50%)`;

        particles.push(new Particle(x, y, radius, color, dx, dy, 'explosion'));
    }

    explosions.push(particles); // Add particles to active explosions

    if (explosions.length === 1) {
        animate(); // Start animation loop if it's the first explosion
    }
}

function createSmoke(x, y, numParticles) {
    const particles = []; // Array to store particles for this smoke

    for (let i = 0; i < numParticles; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 0.01;
        const dx = Math.cos(angle) * speed;
        const dy = Math.sin(angle) * speed;
        const radius = Math.random() * 4 + 1.5;
        // const color = `rgba(0, 0, 0, 0.4)`; // smoke code
        const color = `rgba(0, 0, 0, 0.4)`;

        particles.push(new Particle(x, y, radius, color, dx, dy, 'smoke'));
    }

    explosions.push(particles); // Add particles to active explosions

    if (explosions.length === 1) {
        animate(); // Start animation loop if it's the first explosion
    }
}

function createFire(x, y, numParticles) {
    const particles = []; // Array to store particles for this smoke

    for (let i = 0; i < numParticles; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.3 + 0.01;
        const dx = Math.cos(angle) * speed;
        const dy = Math.sin(angle) * speed;
        const radius = Math.random() * 2 + 3;
        // const color = `rgba(0, 0, 0, 0.4)`; // smoke code
        const color = `rgba(226, 88, 34, 0.4)`;

        particles.push(new Particle(x, y, radius, color, dx, dy, 'smoke'));
    }

    explosions.push(particles); // Add particles to active explosions

    if (explosions.length === 1) {
        animate(); // Start animation loop if it's the first explosion
    }
}

function animate() {
    let explosionsRemaining = false; // Flag to track if explosions are still active

    for (let i = 0; i < explosions.length; i++) {
        const particles = explosions[i];

        for (let j = 0; j < particles.length; j++) {
            const particle = particles[j];
            particle.update();

            if (particle.radius <= 0 && particle.particleType === 'explosion') {
                particles.splice(j, 1);
                j--;
            } else if (particle.radius >= 10 && particle.particleType === 'smoke') {
                particles.splice(j, 1);
                j--;
            }
        }

        if (particles.length === 0) {
            explosions.splice(i, 1);
            i--;
        } else {
            explosionsRemaining = true;
        }
    }

    if (explosionsRemaining) {
        requestAnimationFrame(animate);
    }
}

function playExplosion(x,y){
    createSmoke(x, y, 40);
    createFire(x,y, 100);
}
// canvas.addEventListener('click', function(event) {
//     const rect = canvas.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;
//     // createExplosion(x, y, 100);
//     createSmoke(x, y, 40);
//     createFire(x,y, 100)
// });