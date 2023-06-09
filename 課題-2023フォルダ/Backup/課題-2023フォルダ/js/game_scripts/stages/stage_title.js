/*
* Stage Title Data
* */

class StageTitle extends Stage {
    constructor() {
        super();
        this.background = GameImages.title_bg;
        this.bgm = "title";
    }

    init() {
        this.createMonsters();
        this.playBGM();
    }

    createMonsters (){
        this._monsterList = [];
        for (let i = 0; i <= 10; i++) {
            const monster = new Crab( new Point(-50,420), 0.3);
            monster._nextDeployTime = randomNumber(1,6) * this._monsterList.length;
            this._monsterList.push(monster);
        }
    }

    drawMonster(){
        let _reset = true;
        for (const monster of this._monsterList) {
            const a = deltaTime;
            monster.update();
            // only draw monster is on the move
            if(monster._state === "move") {
                _reset = false;
                monster.draw();
            }
        }



        // animateArrow(new Point(0,0), new Point(500,500));
        

        // forever loop because this is a relaxing animation
        if(_reset) this.createMonsters();

    }
}





