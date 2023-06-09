/*
* Stage Manager
*/

class Stage {
    constructor() {
        this._monsterList = [];
        this._infoArray = [];
        this.background = null;
        this.wave = null;
        this.effect_timer = 0;
        this.stage_timer = 0;
        this.harvest_time = 0;
        this.mapScale = 1;
        this.stageNavHandler = null;
        this.enable = true;
    }

    init(){
        this.createMonsters();
    }

    deInit(){
        if(waveAnimationID !== undefined){
            // Cancel the animation frame request
            cancelAnimationFrame(waveAnimationID);
        }
        this._monsterList = [];
        player.restaurant.closeInfoBoard();
    }

    drawInfo(){
        drawBlackBoard(740,50,200,220,this._infoArray);
    }

    draw(){
        this.background.Draw(global.canvas.width / 2 , 246.5, true);
        this.drawMonster();
    }

    applyScreenEffect(){
        if(this.effect_timer > 0){
            if(this.effect_timer < 3)  this.effect_timer += deltaTime * g_blurSpeed;
            applyBlurEffect(this.effect_timer);
        }
    }

    countMonster(type) {
        let counter = 0;
        for(const monster of this._monsterList){
            if(monster.type === type) counter++;
        }
        return counter;
    }

// Debug use to all monster number
    ToString(){
        let str  = "Monster List:" 					                    + "<br>";
			str += "---Crab Num :" + this.countMonster("crab")          + "<br>";
			str += "---Oct  Num :" + this.countMonster("octopus")       + "<br>";
			str += "---Squid Num :" + this.countMonster("squid")        + "<br>";
        return str;
    }


    update(){

        // update stage monster behaviors
        stage_manager.current.spawnMonsters();
        stage_manager.current.updateMonsters();
        // update user's player behavior
        player.update();

    }

    updateTimer(){
        this.stage_timer += deltaTime;
        if(this.stage_timer > this.harvest_time) {
            this.stage_timer = 0;
            gotoHome();
        }
    }
    updateMonsters(){
        let deadMobs = [];

        for (const monster of this._monsterList) {
            monster.update();
            if(monster._state === "dead") {
                deadMobs.push(monster);
            }
        }

        // remove no longer active monster
        for (const dead of deadMobs) {
            const index = this._monsterList.indexOf(dead);
            if (index !== -1) {
                // console.log("REMOVED");
                this._monsterList.splice(index, 1);
            }
        }

    }

    drawMonster(){
        for (const monster of this._monsterList) {
            // only draw monster is on the move
            if(monster._state !== "stop")  monster.draw();
        }
    }

    spawnMonsters(){}
    createMonsters(){}
}



