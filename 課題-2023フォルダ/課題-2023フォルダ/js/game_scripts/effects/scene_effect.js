/*
* Graphic Effect
* */

let waveAnimationID;
// Maka Wave Effect
function  makeWaveEffect(att){
    // Create a canvas element dynamically
    const canvas = document.createElement('canvas');
    canvas.width = global.canvas.width;
    canvas.height = att.height;
    // document.body.appendChild(canvas);

// Get the 2D rendering context
    const ctx = canvas.getContext('2d');

// Wave parameters
    const amplitude = 60; // Wave amplitude
    const frequency = 0.02; // Wave frequency
    const phase = 0; // Wave phase shift
    const yOffset = canvas.height / 2; // Vertical offset of the wave
    const waveLength = canvas.width; // Wavelength of the wave
    const waveSpeed = 0.02; // Wave speed
    const fadeOutDistance = att.height; // Distance over which the wave fades out

// Animation loop
    function animate() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Move along the x-axis based on wave speed
        const time = Date.now() * waveSpeed;

        // Draw the wave
        ctx.beginPath();
        ctx.moveTo(0, yOffset);

        for (let x = 0; x <= canvas.width; x++) {
            const angle = (x + time) * frequency;
            const y = yOffset + amplitude * Math.sin(angle) * Math.sin(x / waveLength);
            ctx.lineTo(x, y);
        }

        // Calculate fade-out parameters
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        const fadeOutStart = canvas.width - fadeOutDistance;
        const fadeOutEnd = canvas.width;

        // Add color stops for smooth transparency
        // gradient.addColorStop(0, 'rgba(${att.color}, 0.2)');
        gradient.addColorStop(0, `rgba(${att.color}, 0.2)`);
        gradient.addColorStop(fadeOutStart / canvas.width, `rgba(${att.color}, 0.2)`);
        gradient.addColorStop(fadeOutEnd / canvas.width, `rgba(${att.color}, 0)`);
        gradient.addColorStop(1, `rgba(${att.color}, 0)`);

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        // Fill the canvas with the gradient
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw temp_canvas image back onto the original canvas
        global.c2d.drawImage(canvas, att.posX, att.posY);
        // Request the next animation frame
        waveAnimationID = requestAnimationFrame(animate);
    }

// Start the animation
    animate();
}

// Function to apply blur effect to the image
function applyBlurEffect(blurRadius) {
    // Get global main canvas
    const canvas = global.canvas;
    // Create a temporary canvas
    const tempCanvas = document.createElement('canvas');
    const tempContext = tempCanvas.getContext('2d');

    // Set the temporary canvas size
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    // Draw the image onto the temporary canvas
    tempContext.drawImage(canvas, 0, 0);

    // Apply the blur effect to the temporary canvas
    tempContext.filter = `blur(${blurRadius}px)`;
    tempContext.drawImage(tempCanvas, 0, 0);

    // Draw the blurred image back onto the original canvas
    global.c2d.drawImage(tempCanvas, 0, 0);
}

// fade opacity value
let scene_fade_alpha = 0;

// fade speed value
const fadeOutSpeed = 0.02;
const fadeInSpeed = 0.005;

// starting to fade out
function fadeOut() {
  // make opacity darker to black out whole screen
  scene_fade_alpha += fadeOutSpeed;

  // clear the canvas with a black fill and the current alpha value
  global.c2d.fillStyle = `rgba(0, 0, 0, ${scene_fade_alpha})`;
  global.c2d.fillRect(0, 0, global.canvas.width, global.canvas.height);

  if (scene_fade_alpha < 1) {
    // If the alpha is still smaller than 1, continue fading out
    requestAnimationFrame(fadeOut);
  } else {
    fadeIn();
    app.sequence = app.nextSequence;
    app.sequence_step = 0;
    if(stage_manager.current)   stage_manager.current.deInit();
    deInitHUD();
  }
}

function fadeIn(){
    scene_fade_alpha -= fadeInSpeed;
    // clear the canvas with a black fill and the current alpha value
    global.c2d.fillStyle = `rgba(0, 0, 0, ${scene_fade_alpha})`;
    global.c2d.fillRect(0, 0, global.canvas.width, global.canvas.height);

    if (scene_fade_alpha > 0) {
        // If the alpha is still larger than 0, continue fading in
        requestAnimationFrame(fadeIn);
    }

}
  