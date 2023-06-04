/*
* Stage Manager
*/

class Stage {
    constructor() {
        this.monsterList = [];
        this.background = null;
        this.wave = null;
        this.init();
    }

    init(){
        this.createMonsters();
    }

    deInit(){
        if(waveAnimationID !== undefined){
            // Cancel the animation frame request
            cancelAnimationFrame(waveAnimationID);
        }
    }

    draw(){
        this.background.Draw(global.canvas.width / 2 , 246.5, true);
        this.drawMonster();
    }


    createMonsters(){}
    drawMonster(){}
}

