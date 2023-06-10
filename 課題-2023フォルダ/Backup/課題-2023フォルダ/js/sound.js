// Sound effect source paths
const sfx_source = {
    btn_nav: "sound/sfx/ui_btn_navigate.mp3",
    btn_back: "sound/sfx/ui_btn_navigate.mp3",
    btn_enter: "sound/sfx/ui_btn_navigate.mp3",
    wp_net_init_shot: "sound/sfx/wp_net_init_shot.mp3",
    wp_harpoon_init_shot: "sound/sfx/wp_harpoon_init_shot.mp3",
    wp_bomb_init_shot: "sound/sfx/wp_bomb_init_shot.mp3",
    wp_bomb_hit: "sound/sfx/wp_bomb_hit.mp3",
};

// Initialize sound effects
const sfx_sound = {
    btn_nav: null,
    btn_back: null,
    btn_enter: null,
    wp_net_init_shot : null,
    wp_harpoon_init_shot : null,
    wp_bomb_init_shot : null,
    wp_bomb_hit : null,
};

const bgm_source = {
    title           : "sound/bgm/Lonesome Cowboy by Jeremy Sherman.mp3",
    home            : "sound/bgm/Fishing 1_2.mp3",
    stage_01        : "sound/bgm/Gentle ocean waves birdsong and gull.mp3",
    stage_02        : "sound/bgm/Ocean Sea Soft Waves.mp3",
    stage_03        : "sound/bgm/Underwater Whale And Diving Sound Ambient.mp3",
};

const bgm_sound_data = {
    title: null,
    home: null,
    stage_01: null,
    stage_02: null,
    stage_03: null,
};

let bgm_sound;

const sound_manager = {
    currentBGM  : null,
    nextBGM    : null,
    bgmVolume : 0,
    sfxVolume : 1,

    // playSfx : function(sfx) {
    //     if(sfx === null) {
    //         return;
    //     }
    //     // Check if the sound has loaded before playing
    //     if (sfx.readyState >= 2) {
    //         sfx.currentTime = 0; // SFX always needs to start over
    //         sfx.volume = this.sfxVolume;
    //         sfx.play();
    //         sfx.loop = false;
    //     }
    // },

    playSfx: function(sfx) {
        if (sfx === null) {
            return;
        }

        // Check if the sound has loaded before playing
        if (sfx.readyState >= 2) {
            sfx.currentTime = 0; // SFX always needs to start over
            sfx.volume = this.sfxVolume;
            sfx.pause();
            // Create a clone of the audio element
            const sfxClone = sfx.cloneNode();
            // Copy the volume from the original audio to the cloned audio
            sfxClone.volume = sfx.volume;
            // Play the cloned audio
            sfxClone.play();
            sfxClone.loop = false;

            // Remove the cloned audio element when it finishes playing
            sfxClone.addEventListener('ended', function() {
                sfxClone.remove();
            });
        }
    },

    playBgm : function(bgm){
        const bgm_audio = bgm_sound.get(bgm);
        if (bgm_audio === null) {
            console.log("FAILED TO LOAD SOUND");
            return
        }
        if (bgm_audio.readyState >= 2) {
            if(this.currentBGM !== null){
                this.nextBGM = bgm_audio;
                fadeOutBGM(this.currentBGM, 2);
            } else {
                // Fade in the background music over 3 seconds
                fadeInBGM(bgm_audio, 3);
            }
        }
    },

    toggleSfxVolume : function (){
      if(this.sfxVolume) this.sfxVolume = 0;
      else this.sfxVolume = 1;
    },


    toggleBgmVolume : function () {
        if(this.bgmVolume <= 0){
            this.bgmVolume = 1;
            if(this.currentBGM) fadeInBGM(this.currentBGM, 3);
            else stage_manager.current.playBGM();
        }
        else {
            this.bgmVolume = 0;
            if(this.currentBGM) this.currentBGM.volume = this.bgmVolume;
        }
    },



}

// Create a sound effect from the given source path
function createSound(sourcePath) {
    const audio = new Audio();
    audio.src = sourcePath;
    audio.load();
    return audio;
}



// Function to fade in the background music
function fadeInBGM(currentBGM, duration) {
    const fadeSpeed = (1 / duration) ;

    currentBGM.volume = 0;
    currentBGM.currentTime = 0;
    currentBGM.play();

    sound_manager.nextBGM = null;
    sound_manager.currentBGM = currentBGM;

    // Schedule the gradual volume reduction using requestAnimationFrame
    function increaseVolume() {
        currentBGM.volume = Math.min(currentBGM.volume + fadeSpeed * deltaTime, 1) ;

        if ( currentBGM.volume >= 1|| sound_manager.bgmVolume === 0 ||   sound_manager.nextBGM) {
            return;
        }
        // console.log("FADE IN:  " + currentBGM.volume);
        // Request the next frame
        requestAnimationFrame(increaseVolume);
    }
    requestAnimationFrame(increaseVolume);

}

// Function to fade out the background music gradually
function fadeOutBGM(currentBGM, duration) {
    // Calculate the volume change per second based on the duration
    const fadeSpeed = (currentBGM.volume / duration) ;

    // Schedule the gradual volume reduction using requestAnimationFrame
    function decreaseVolume() {
        if ( currentBGM.volume <= 0) {
            // Stop the audio playback once the fade-out is complete
            currentBGM.pause();
            currentBGM.currentTime = 0;
            if(sound_manager.nextBGM !== null){
                fadeInBGM(sound_manager.nextBGM, 5); // fade in audio in 5 seconds
            }
            return;
        }
        // Calculate the new volume based on the elapsed time
        currentBGM.volume = Math.max(currentBGM.volume - fadeSpeed * deltaTime, 0);
        // console.log("FADE OUT:  " + currentBGM.volume);
        // Request the next frame
        requestAnimationFrame(decreaseVolume);
    }


    // Start the volume reduction
    requestAnimationFrame(decreaseVolume);
}


document.addEventListener("DOMContentLoaded", function () {
    // Initialize the sound effects based on the source paths
    for (const key in sfx_source) {
        if (sfx_source.hasOwnProperty(key)) {
            sfx_sound[key] = createSound(sfx_source[key]);
        }
    }
    // Initialize the sound effects based on the source paths
    for (const key in bgm_source) {
        if (bgm_source.hasOwnProperty(key)) {
            bgm_sound_data[key] = createSound(bgm_source[key]);
        }
    }

    bgm_sound = new Map([
        ["title"    , bgm_sound_data.title      ] ,
        ["home"     , bgm_sound_data.home       ] ,
        ["stage_01" , bgm_sound_data.stage_01   ] ,
        ["stage_02" , bgm_sound_data.stage_02   ] ,
        ["stage_03" , bgm_sound_data.stage_03   ] ,
    ]);
});


function toggleSound(){
    sound_manager.toggleSfxVolume();
}

function toggleBgm(){
    sound_manager.toggleBgmVolume();
}

