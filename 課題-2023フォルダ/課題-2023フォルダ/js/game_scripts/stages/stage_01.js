/*
* Stage 01 Data
* */

class Stage01 extends Stage {
    constructor() {
        super();

        this.stageNavHandler = gotoStage01;
        this._infoArray = stageDescription.stage01;
        this.background = GameImages.stage01_bg;
        this.playerInitInfo = {
            pos : new Point(100,140),
            scale : 1
        }
        this.wave = {
            height :120,
            posX: 0,
            posY : this.playerInitInfo.pos.y + 10,
            color: '0,0,100',
        }

        this.harvest_time = 90;

        this.crabSpawnTimer = 0;
        this.crabNextSpawnTime = 0;

        this.octSpawnTimer = 0;
        this.octNextSpawnTime = 0;
        this.bgm = "stage_01";

    }

    update() {
        super.update();
        this.updateTimer();
    }

    draw(){
        // render layer 1
        super.draw();
        // render layer 2
        player.draw();
        drawClockCircle(550,25,16,this.stage_timer/this.harvest_time * 100);
        // draw effect upon rendered layer
        this.applyScreenEffect();
        // draw inventory layer
        player.inventory.draw();
        // draw button highlight rectangle
        hud_manager.drawHighLightWpButton();

    }

    init(){
        super.initGameStage();
        super.init();
    }

    spawnOctopus(){
        this.octSpawnTimer += deltaTime;
        if(this.octSpawnTimer > this.octNextSpawnTime){
            // console.log("Octopus Spawned")
            const minRand = 5;
            let maxRand = 20 - player.restaurant.level * 0.2;
            maxRand = Math.max(minRand,maxRand);
            this.octNextSpawnTime = randomNumber(minRand,maxRand);
            this.octSpawnTimer = 0;

            let scaleRandom = randomNumber(2,4) * 0.1;
            this._monsterList.push(new Octopus( new Point(-50,300), scaleRandom));
        }
    }


    spawnCrab(){
        this.crabSpawnTimer += deltaTime;
        if(this.crabSpawnTimer > this.crabNextSpawnTime){
            // console.log("Crab Spawned")
            const minRand = 1;
            let maxRand = 3 - player.restaurant.level * 0.2;
            maxRand = Math.max(minRand,maxRand);
            this.crabNextSpawnTime = randomNumber(1, maxRand);
            this.crabSpawnTimer = 0;
            let scaleRandom = randomNumber(2,3) * 0.1;
            this._monsterList.push(new Crab( new Point(-50,480), scaleRandom));
        }
    }

    spawnMonsters (){
        this.spawnCrab();
        this.spawnOctopus();
    }

    createMonsters (){
        this._monsterList = [];
    }

}





