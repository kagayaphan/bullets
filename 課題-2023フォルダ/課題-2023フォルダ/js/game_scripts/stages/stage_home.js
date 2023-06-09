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
        this.maxEnableStage = 3;
        this.startButton = null;
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
            }
            if(button.content.includes("出発")){
                this.startButton = button;
                this.startButton.disable();
            }
            button._angle = randomNumber(0,360);
        }

        // draw road lane based on the map locator button position
        // max enable stage never be larger mapLocatorButtons length
        for(let i = 0 ; i < this.maxEnableStage; i++){
            const button = this.mapLocatorButtons[i];
            // push locator pointList map to draw
            this.mapPointList.push(new Point(button.x,button.y));
        }

        
    }

    deInit() {
        
        super.deInit();
        this.selectStage = null;
        this.startButton = null;
        this.mapPointList = [];
        this.mapLocatorButtons = [];
    }
    
    update(){
        player.restaurant.update();

        if(this.selectStage) {
            if(this.selectStage.enable) this.startButton.enable();
            else this.startButton.disable();
        }
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


