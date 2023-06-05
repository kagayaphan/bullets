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

    countMonster(type) {
        let counter = 0;
        for(const monster of this.monsterList){
            if(monster.type === type) counter++;
        }
        return counter;
    }

    ToString(){
        var str  = "Monster List:" 					                    + "<br>";
			str += "---Crab Num :" + this.countMonster("crab")          + "<br>";
			str += "---Oct  Num :" + this.countMonster("oct")           + "<br>";
			str += "---Squid Num :" + this.countMonster("squid")        + "<br>";
        return str;
    }

    // interface
    spawnMonsters(){}
    createMonsters(){}
    drawMonster(){}
}

