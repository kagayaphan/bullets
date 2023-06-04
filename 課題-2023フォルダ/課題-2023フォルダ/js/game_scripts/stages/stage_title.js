/*
* Stage Title Data
* */

class StageTitle extends Stage {
    constructor() {
        super();
        this.background = GameImages.title_bg;

    }

    createMonsters (){
        this.monsterList = [];
        for (let i = 0; i <= 10; i++) {
            const monster = new Crab( new Point(-50,420), 0.3);
            // monster.speed = 2; // test speed
            monster._nextDeployTime = randomNumber(1,6) * this.monsterList.length;
            this.monsterList.push(monster);
        }
    }

    drawMonster(){
        let _reset = true;
        for (const monster of this.monsterList) {
            const a = deltaTime;
            monster.update();
            // only draw monster is on the move
            if(monster._state === "move") {
                _reset = false;
                monster.draw();
            }
        }

        // forever loop because this is a relaxing animation
        if(_reset) this.createMonsters();

    }
}

// let stageTitle = new StageTitle();




