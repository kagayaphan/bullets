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
        this.mapPointList = [];
        this.mapLocatorButtons = [];
        this.maxEnableStage = 0;
    }

    init(){
        hud_manager.changeMenu(hud_manager.home);       

        // parse home use hud data into separate container to manage easier
        for(const button of hud_manager.current.buttons){
            // do nothing with back button
            if(button.clickHandler === "gotoTitle") continue;
            
            if(button.content.includes("map")) {
                // push locator button
                this.mapLocatorButtons.push(button);
                // push locator pointList map to draw
                this.mapPointList.push(new Point(button.x,button.y));
            }
            button._angle = randomNumber(0,360);
        }

        
    }

    deInit() {
        
        super.deInit();
        this.selectStage = null;
        this.mapPointList = [];
        this.mapLocatorButtons = [];
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
        }

        for(let i = 0; i < this.mapPointList.length - 1; i++){
            const point = this.mapPointList[i];
            drawLaneMarkings(point, this.mapPointList[i+1]);
            
        }
    }
    

}


