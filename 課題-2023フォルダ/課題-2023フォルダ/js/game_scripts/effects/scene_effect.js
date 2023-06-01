// fade opacity value
let scene_fade_alpha = 0;

// fade speed value
const fadeOutSpeed = 0.02;
const fadeInSpeed = 0.005;

// Starting to fade
function fadeOut() {
  // make opacity darker to blackout whole screen
  scene_fade_alpha += fadeOutSpeed;

  // clear the canvas with a black fill and the current alpha value
  global.c2d.fillStyle = `rgba(0, 0, 0, ${scene_fade_alpha})`;
  global.c2d.fillRect(0, 0, global.canvas.width, global.canvas.height);

  if (scene_fade_alpha < 1) {
    // If the alpha is still smaller than 1, continue fading out
    requestAnimationFrame(fadeOut);
  } else {
    app.sequence = main_seq;
    fadeIn()
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
  