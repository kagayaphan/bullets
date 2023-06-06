/*
Player's Restaurant Properties
*/

class Restaurant {
    constructor(owner){
        this.owner = owner;
        this.level = 1;
        
        this.crabStock = 0;
        this.octStock = 0;
        this.squidStock = 0;

        this.crabSales = 0;
        this.octSales = 0;
        this.squidSales = 0;

        this._crabSellTimer = 0;
        this._octSellTimer = 0;
        this._squidSellTimer = 0;

        

        this._crabNotifyEffectTimer = 1;
        this._octNotifyEffectTimer = 1;
        this._squidNotifyEffectTimer = 1;
    }

    updateStock(monster){
        const type = monster.type;
        if     (type === "crab")  {
            this. _crabNotifyEffectTimer = 0;
            this.crabStock++;
        }   
        else if(type === "octopus") { 
            this. _octNotifyEffectTimer = 0;
            this.octStock++;
        }
        else if(type === "quid")     {
            this. _squidNotifyEffectTimer = 0;
            this.squidStock++;
        }
    }

    draw(){

        if(this._crabNotifyEffectTimer < 1){
            this._crabNotifyEffectTimer += deltaTime;
        }

        if(this._octNotifyEffectTimer < 1){
            this._octNotifyEffectTimer += deltaTime;
        }

        if(this._squidNotifyEffectTimer < 1){
            this._squidNotifyEffectTimer += deltaTime;
        }

        var red = 255 ;    // Value for red component
        var green = 255;    // Value for green component
        var blue = 255;   // Value for blue component

        var crab_color = "rgb(" + red*this._crabNotifyEffectTimer + ", " + green*this._crabNotifyEffectTimer + ", " + blue*this._crabNotifyEffectTimer + ")";
        var oct_color = "rgb(" + red*this._octNotifyEffectTimer + ", " + green*this._octNotifyEffectTimer + ", " + blue*this._octNotifyEffectTimer + ")";
        var squid_color = "rgb(" + red*this._squidNotifyEffectTimer + ", " + green*this._squidNotifyEffectTimer + ", " + blue*this._squidNotifyEffectTimer + ")";
        global.c2d.fillStyle = crab_color;
        global.c2d.textAlign = "center";
        const x = 400;
        const y = 15;
        const xPosModifier = 50;
        const yPosModifier = 25;
        GameImages.icon_crab.Draw(          x, y, true);        
        global.c2d.fillText(this.crabStock, x, y + yPosModifier);

        GameImages.icon_octopus.Draw(           x + xPosModifier, y, true);
        global.c2d.fillStyle = oct_color;        
        global.c2d.fillText(this.octStock,  x + xPosModifier, y + yPosModifier);

        GameImages.icon_squid.Draw(          x + xPosModifier * 2, y, true);
        global.c2d.fillStyle = squid_color;
        global.c2d.fillText(this.squidStock, x + xPosModifier * 2, y + yPosModifier);


    }
}

