/*
* Graphic Effect
* */

let waveAnimationID;

function makeWaveEffect(att) {
    // Create a temporary canvas element dynamically
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = global.canvas.width;
    tempCanvas.height = att.height;

    // Get the 2D rendering context
    const ctx = tempCanvas.getContext('2d');

    // Wave parameters
    const amplitude = att.height / 4; // Wave amplitude based on att.height
    const frequency = 0.02; // Wave frequency
    const phase = 0; // Wave phase shift
    const yOffset = tempCanvas.height / 2; // Vertical offset of the wave
    const waveLength = tempCanvas.width; // Wavelength of the wave
    const waveSpeed = 0.02; // Wave speed
    const fadeOutDistance = att.height / 2; // Distance over which the wave fades out

    // Animation loop
    function animate() {
        // Clear the canvas
        ctx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);

        // Move along the x-axis based on wave speed
        const time = Date.now() * waveSpeed;

        // Draw the wave
        ctx.beginPath();
        ctx.moveTo(0, yOffset);

        for (let x = 0; x <= tempCanvas.width; x++) {
            const angle = (x + time) * frequency;
            const y = yOffset + amplitude * Math.sin(angle) * Math.sin(x / waveLength);
            ctx.lineTo(x, y);
        }

        // Calculate fade-out parameters
        const gradient = ctx.createLinearGradient(0, 0, 0, tempCanvas.height);
        const fadeOutStart = tempCanvas.height - fadeOutDistance; // Updated calculation
        const fadeOutEnd = tempCanvas.height;

        // Add color stops for smooth transparency
        gradient.addColorStop(0, `rgba(${att.color}, 0.2)`);
        gradient.addColorStop(fadeOutStart / tempCanvas.height, `rgba(${att.color}, 0.2)`); // Updated calculation
        gradient.addColorStop(fadeOutEnd / tempCanvas.height, `rgba(${att.color}, 0)`); // Updated calculation
        gradient.addColorStop(1, `rgba(${att.color}, 0)`);

        ctx.lineTo(tempCanvas.width, tempCanvas.height);
        ctx.lineTo(0, tempCanvas.height);
        ctx.closePath();

        // Fill the canvas with the gradient
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw temp_canvas image back onto the original canvas
        global.c2d.drawImage(tempCanvas, att.posX, att.posY);

        // Request the next animation frame
        waveAnimationID = requestAnimationFrame(animate);
    }

    // Start the animation
    animate();
}




//--------- Function to apply blur effect to the image
const g_blurSpeed = 4;

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
const fadeOutSpeed = 0.05;
const fadeInSpeed = 0.01;

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
    // deInitHUD();
    if(app.nextSequence){
        app.sequence = app.nextSequence;
        app.sequence_step = 0;
        app.nextSequence = null;
        if(stage_manager.current)   stage_manager.current.deInit();
        
    } else {
        stage_manager.current.deInit();
        stage_manager.current = stage_manager.nextStage;
        stage_manager.current.init();
        stage_manager.nextStage = null;        
    }
    // Starting to fade in with new scene Info
    fadeIn();
    
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
  