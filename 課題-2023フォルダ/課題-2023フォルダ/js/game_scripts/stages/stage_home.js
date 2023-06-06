/*
* Home's World Map - This is where player choose where to hunt
* */


class StageHome extends Stage {
    constructor() {
        super();
        this.background = GameImages.world_map;
        this.isNewGame = true;
        this.locatorAngleIncrement = 1;
    } 

    init(){
        initHomeMenu();
    }
    
    update(){
        
    }

    draw(){
        super.draw();        
        const hudButtons = hud_manager.current.buttons;
        
        for(const button of hudButtons){
            button._angle += this.locatorAngleIncrement;
            if(button._angle === 25 || button._angle === -25) this.locatorAngleIncrement *= -1;
        }
    }
    

}



