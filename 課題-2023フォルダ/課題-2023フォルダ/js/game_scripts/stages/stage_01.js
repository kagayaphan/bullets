/*
* Stage 01 Data
* */

class Stage01 extends Stage {
    constructor() {
        super();
        this.background = GameImages.stage01_bg;
        this.playerPos = new Point(100,140);
        this.wave = {
            height :120,
            posX: 0,
            posY : 150,
            color: '0,0,100',
        }
        this.crabSpawnTimer = 0;
        this.crabNextSpawnTime = 0;

        this.octSpawnTimer = 0;
        this.octNextSpawnTime = 0;

    }

    init(){
        initGameMenu();
        makeWaveEffect(stage_manager.current.wave);
        player.resetState();
        //ODO remove this line when release player need to buy weapon
        player.assignWeapon(new WeaponNet());

    }

    draw(){
        super.draw();
        player.draw();
        if(this.effect_timer > 0){
            if(this.effect_timer < 3)  this.effect_timer += deltaTime * 4;
            applyBlurEffect(this.effect_timer);
        }
    }

    spawnOctopus(){
        this.octSpawnTimer += deltaTime;
        if(this.octSpawnTimer > this.octNextSpawnTime){
            console.log("Octopus Spawned")
            this.octNextSpawnTime = randomNumber(5,20);
            this.octSpawnTimer = 0;

            let scaleRandom = randomNumber(2,4) * 0.1;
            this.monsterList.push(new Octopus( new Point(-50,300), scaleRandom));
        }
    }


    spawnCrab(){
        this.crabSpawnTimer += deltaTime;
        if(this.crabSpawnTimer > this.crabNextSpawnTime){
            console.log("Crab Spawned")
            this.crabNextSpawnTime = randomNumber(1,3);
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

    update(){
        // update stage monster behaviors
        stage_manager.current.spawnMonsters();
        stage_manager.current.updateMonsters();
        // update user's player behavior
        player.update();
        const mouse = global.mouse;
        if( mouse.up )
        {
            const point = new Point(mouse.up_pos.x,mouse.up_pos.y);
            // make sure player wont shot when click on UI 
            if(point.y > player._pos.y) player.initShot(point);
        }
    }

    updateMonsters(){
        let deadMobs = [];

        for (const monster of this.monsterList) {
            monster.update();
            if(monster._state === "dead") {
                deadMobs.push(monster);
                continue;
            }
        }

        for (const dead of deadMobs) {
            const index = this.monsterList.indexOf(dead);
            if (index !== -1) {
                // console.log("REMOVED");
                this.monsterList.splice(index, 1);
            }
        }

    }


    drawMonster(){
        for (const monster of this.monsterList) {            
            // only draw monster is on the move
            if(monster._state !== "stop")  monster.draw();
        } 
    }

}

// let stage01 = new Stage01();




