/*
* Stage 03 Data
* */

class Stage03 extends Stage {
    constructor() {
        super();
        this.stageNavHandler = gotoStage03;
        this.infoArray = stageDescription.stage03;
        this.background = GameImages.stage03_bg;
        this.mapScale = 0.4;
        this.playerInitInfo = {
            pos : new Point(450,80),
            scale : this.mapScale // facing of the boat
        }
        this.wave = {
            height :125 * this.mapScale,
            posX: 0,
            posY : this.playerInitInfo.pos.y + 10 * this.mapScale,
            color: '0,0,100',
        }

        this.harvest_time = 120;


        this.crabSpawnTimer = 0;
        this.crabNextSpawnTime = 0;

        this.octSpawnTimer = 0;
        this.octNextSpawnTime = 0;

        this.squidSpawnTimer = 0;
        this.squidNextSpawnTime = 0;

    }

    toJSON() {
        return {
            background: this.background,
            playerInitInfo: this.playerInitInfo,
            wave: this.wave,
            crabSpawnTimer: this.crabSpawnTimer,
            crabNextSpawnTime: this.crabNextSpawnTime,
            octSpawnTimer: this.octSpawnTimer,
            octNextSpawnTime: this.octNextSpawnTime
        };
    }

    ExportJson(){
        const stageJson = JSON.stringify(this.toJSON());
        console.log(stageJson);
    }

    init(){
        // change to game menu
        hud_manager.changeMenu(hud_manager.game);
        // display wave animation
        makeWaveEffect(stage_manager.current.wave);
        // set all params to default value
        player.resetState();
        // assign default weapon
        player.inventory.selectWeapon("net");
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
    }

    spawnSquid(){
        this.squidSpawnTimer += deltaTime;
        if(this.squidSpawnTimer > this.squidNextSpawnTime){
            // console.log("Octopus Spawned")
            this.squidNextSpawnTime = randomNumber(1,3);
            this.squidSpawnTimer = 0;

            let scaleRandom = randomNumber(3,5) * 0.1;
            this.monsterList.push(new Squid( new Point(-50,300), scaleRandom));
        }
    }

    spawnOctopus(){
        this.octSpawnTimer += deltaTime;
        if(this.octSpawnTimer > this.octNextSpawnTime){
            // console.log("Octopus Spawned")
            this.octNextSpawnTime = randomNumber(4,9);
            this.octSpawnTimer = 0;

            let scaleRandom = randomNumber(3,5) * 0.1;
            this.monsterList.push(new Octopus( new Point(-50,300), scaleRandom));
        }
    }


    spawnCrab(){
        this.crabSpawnTimer += deltaTime;
        if(this.crabSpawnTimer > this.crabNextSpawnTime){
            // console.log("Crab Spawned")
            this.crabNextSpawnTime = randomNumber(30,50);
            this.crabSpawnTimer = 0;
            let scaleRandom = randomNumber(2,3) * 0.1;
            this.monsterList.push(new Crab( new Point(-50,480), scaleRandom));
        }

    }

    spawnMonsters (){
        this.spawnCrab();
        this.spawnOctopus();
        this.spawnSquid();
    }

    createMonsters (){
        this.monsterList = [];
        // for (let i = 0; i < 30; i++) {
        //     const monster = new Crab( new Point(-50,480), 0.3);
        //     monster._nextDeployTime = randomNumber(6,25) * this.monsterList.length;
        //     this.monsterList.push(monster);
        // }
    }



}

// let stage01 = new Stage01();




