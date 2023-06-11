/*
* Stage Manager
*/

class Stage {
    constructor() {
        this._monsterList = []; // current spawned monsters
        this._infoArray = []; // home's display information
        this.background = null; // stage main background
        this.wave = null; // wave information to draw
        this.effect_timer = 0; // under some special effect that will pause the stage
        this.stage_timer = 0; // stage running timer
        this.cd_timer = 0; // stage cool down timer
        this.harvest_time = 0; // stage limit time after this time turn into cool down
        this.mapScale = 1; // override object scale
        this.stageNavHandler = null; // move to function pointer
        this.enable = true; // unlock state
        this.bgm = "";
    }

    // play BGM
    playBGM(){
        sound_manager.playBgm(this.bgm);
    }

    initGameStage(){
        this.stage_timer = 0;
        // change to game menu
        hud_manager.changeMenu(hud_manager.game);
        // display wave animation
        makeWaveEffect(stage_manager.current.wave);
        // set all params to default value
        player.resetState();
        // check quest and display info
        if(g_MainQuest[player.completedQuest]._handleStage === this){
            drawQuestInstruct(g_MainQuest[player.completedQuest]._info, Screen.centerW, Screen.centerH, 30, 5000);
        }
    }

    init(){
        this.playBGM();
    }

    deInit(){
        if(waveAnimationID !== undefined){
            // Cancel the animation frame request
            cancelAnimationFrame(waveAnimationID);
        }
        this._monsterList = [];
        player.restaurant.closeInfoBoard();
        this.cd_timer = 20;
    }

    drawInfo(){
        drawBlackBoard(740,50,200,220,this._infoArray);
        const s = Math.round(this.cd_timer);
        if(!this.enable){

        }

        if(this.cd_timer > 0) drawText("後 "+s+" 秒",851, 400,20);
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
        // update cool down all stages;
        stage_manager.updateCD();
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

    coolDown() {
        if(this.cd_timer > 0){
            this.cd_timer -= deltaTime;
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



