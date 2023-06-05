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

    spawnOctopus(){
        this.octSpawnTimer += deltaTime;
        if(this.octSpawnTimer > this.octNextSpawnTime){
            console.log("Octopus Spawned")
            this.octNextSpawnTime = randomNumber(2,4);
            this.octSpawnTimer = 0;

            let scaleRandom = randomNumber(2,4) * 0.1;
            this.monsterList.push(new Octopus( new Point(-50,290), scaleRandom));
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

    drawMonster(){
        for (const monster of this.monsterList) {
            const a = deltaTime;
            monster.update();
            // only draw monster is on the move
            if(monster._state === "move" || monster._state === "caught")  monster.draw();
        }

    }

}

// let stage01 = new Stage01();




