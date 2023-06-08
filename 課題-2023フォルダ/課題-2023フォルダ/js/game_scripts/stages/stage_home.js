/*
* Home's World Map - This is where player choose where to hunt
* */


class StageHome extends Stage {
    constructor() {
        super();
        this.infoArray = stageDescription.stageHome;
        this.background = GameImages.world_map;
        this.isNewGame = true;
        this.locatorAngleIncrement = 1;
        this.selectStage = null;
    }

    init(){
        hud_manager.changeMenu(hud_manager.home);
        for(const button of hud_manager.current.buttons){
            if(button.clickHandler === "gotoTitle") continue;

            button._angle = randomNumber(0,360);
            // button._angle += this.locatorAngleIncrement;
            // if(button._angle === 25 || button._angle === -25) this.locatorAngleIncrement *= -1;
        }
    }

    deInit() {
        super.deInit();
        this.selectStage = null;
    }
    
    update(){
        player.restaurant.update();

    }

    draw(){
        super.draw();
        player.restaurant.drawHomepage();
        const hudButtons = hud_manager.current.buttons;

        if(this.selectStage) {
            this.selectStage.drawInfo();
        } else {
            drawTextArray(730,50,this.infoArray, 13);
        }


        for(const button of hudButtons){
            if(button.clickHandler === "gotoTitle") continue;
            button._angle += 0.1;
            // button._angle += this.locatorAngleIncrement;
            // if(button._angle === 25 || button._angle === -25) this.locatorAngleIncrement *= -1;
        }
    }
    

}


