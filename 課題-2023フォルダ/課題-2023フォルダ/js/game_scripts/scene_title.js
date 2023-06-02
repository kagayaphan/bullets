
// GameImages.crab.Draw(object.x, object.y, true, 0.3);

const screen = {
    width: 800, // Adjust screen width as needed
    height: 600 // Adjust screen height as needed
  };
  
  const object = {
    x: 0,
    y: 0
  };
  
  const movementDistance = 50; // Adjust the desired movement distance
  
  function drawObject() {
    // Replace the following line with your code to display the object image
    GameImages.crab.Draw(object.x, object.y, true, 0.3);
  }
  
  function moveObject() {
    const startX = object.x;
    const startY = object.y;
  
    const endX = Math.min(startX + movementDistance, screen.width); // Move until reaching the right edge of the screen
  
    const duration = Math.abs(endX - startX) * 5; // Adjust the speed of the movement
  
    const startTime = Date.now();
  
    function updatePosition() {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = elapsed / duration;
  
      object.x = startX + (endX - startX) * progress;
      object.y = startY;
  
      // Display current position
    //   console.log(`Current position: x=${object.x}, y=${object.y}`);
        drawObject()
        requestAnimationFrame(updatePosition);
    //   if (progress < 1) {
    //     requestAnimationFrame(updatePosition);
    //   } else {
    //     drawObject();
    //   }
    }
  
    requestAnimationFrame(updatePosition);
  }
  
  moveObject();
  
  

function title_seq()
{
    switch( app.sequence_step )
    {
        case 0:
            var ready = true;
            for(var i= 0, c= GameImages.length ; i<c ; i++ )
            {
                ready = ready && GameImages[i].IsReady();
            }
            if( ready )
            {
                app.sequence_step++;
            }
            break;
        case 1:
            // Draw title background
            GameImages.title_bg.Draw(0,50,false);
            



            // Start UI Update
            drawHUD()
            break;
    }
    app.scaleBase=1.0+0.1*Math.sin(global.frameCount/15);
}