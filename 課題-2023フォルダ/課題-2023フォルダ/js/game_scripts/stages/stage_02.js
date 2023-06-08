/*
* Stage 01 Data
* */





class Stage02 extends Stage {
    constructor() {
        super();
        this.stageNavHandler = gotoStage02;
        this.infoArray = stageDescription.stage02;
        this.background = GameImages.stage02_bg;
        this.mapScale = 0.6;
        this.playerInitInfo = {
            pos : new Point(850,80),
            scale : -this.mapScale
        }
        this.wave = {
            height :50,
            posX: 0,
            posY : this.playerInitInfo.pos.y + 10,
            color: '0,0,100',
        }

        this.harvest_time = 80;

        this.crabSpawnTimer = 0;
        this.crabNextSpawnTime = 0;

        this.octSpawnTimer = 0;
        this.octNextSpawnTime = 0;

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
        player.inventory.selectWeapon("harpoon");
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

    spawnOctopus(){
        this.octSpawnTimer += deltaTime;
        if(this.octSpawnTimer > this.octNextSpawnTime){
            // console.log("Octopus Spawned")
            this.octNextSpawnTime = randomNumber(5,12);
            this.octSpawnTimer = 0;

            let scaleRandom = randomNumber(3,5) * 0.1;
            this.monsterList.push(new Octopus( new Point(-50,300), scaleRandom));
        }
    }


    spawnCrab(){
        this.crabSpawnTimer += deltaTime;
        if(this.crabSpawnTimer > this.crabNextSpawnTime){
            console.log("Crab Spawned")
            this.crabNextSpawnTime = randomNumber(1,5);
            this.crabSpawnTimer = 0;
            let scaleRandom = randomNumber(2,3) * 0.1;
            this.monsterList.push(new Crab( new Point(-50,480), scaleRandom));
        }

    }

    spawnMonsters (){
        this.spawnCrab();
        this.spawnOctopus();
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




