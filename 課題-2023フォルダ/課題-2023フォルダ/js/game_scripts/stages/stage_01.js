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
    }

    createMonsters (){
        this.monsterList = [];
        for (let i = 0; i < 30; i++) {
            const monster = new Crab( new Point(-50,480), 0.3);
            monster._nextDeployTime = randomNumber(6,25) * this.monsterList.length;
            this.monsterList.push(monster);
        }
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




