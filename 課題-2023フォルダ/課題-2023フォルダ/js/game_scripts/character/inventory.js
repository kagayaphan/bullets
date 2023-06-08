/*
* Player Inventory Class content weapon, item, etc...
* */


const g_weapon_max_level = 10;

class Weapon{
    constructor() {
        this._bullet = null;
        this._cdTimer = 0;
        this._cdMax = 0;
        this._image = null;
        this._icon  = null;
        this._imageScale = 1;
        this._curAmmoCount = 0;
        this._durability = 100; // percentage of used status
        // data parameters
        this._maxAmmo = 0;
        this.level = 1;
        this.upgradeCost = 100; // use to calculate upgrade money
        this._speed = 0;
        this._range = 0;
        // TODO make a data table for each type of weapon
        this._speedAdd = 1.5;
        this._rangeAdd = 0.2;
        this._ammoAdd = 0.4;
    }

    initShot(target){
        if(_DEBUG) this._curAmmoCount = 0; // Debug cheat
        if(this._curAmmoCount >= this._maxAmmo){
            hud_manager.message = "弾切れ"
            return;
        }
        this._curAmmoCount++;
        const newBullet = new this._bullet(this._image, this._imageScale, this._speed,this._range);
        newBullet.initShot(target);
        player._bulletPrototypes.push(newBullet);
    }

    levelUp(){
        this.level++;
        this._speed += this.level * this._speedAdd;
        this._range += this.level * this._rangeAdd;
        this._maxAmmo += this.level * this._ammoAdd;
    }

    upgrade(){
        if(this.level >= g_weapon_max_level) {
            hud_manager.message = "最高レベルです。"
            return ;
        }
        const cost = this.level * this.upgradeCost;
        if(player.restaurant.requestMoney(cost)) {
            this.levelUp();
            return true;
        } else {
            hud_manager.message = "お金が足りない"
            return false;
        }
    }

    draw(x,y){
    // draw icon
        this._icon.Draw(x,y,true);
    // draw current weapon level
        y += 25;
        global.c2d.save();
        global.c2d.font = `14px "Roboto Light", sans-serif`;
        global.c2d.fillStyle = 'white';
        global.c2d.fillText("Lv."+this.level, x-50, y);
    // draw speed properties name
        y += 25;
        global.c2d.fillText("速度：", x-50, y);
    // draw properties value
        y += 15;
        drawRoundedRectangle(x-50, y,　this._speed * 0.3, 10,2,"white","green")
    // draw catch range properties name
        y += 35;
        global.c2d.fillText("範囲：", x-50, y);
        y += 15;
        drawRoundedRectangle(x-50, y,　this._range * 0.6, 10,2,"white","green")
    // draw ammo limit
        y += 35;
        global.c2d.fillText("弾薬：", x-50, y);
        y += 15;
        drawRoundedRectangle(x-50, y,　this._maxAmmo, 10,2,"white","green")

        global.c2d.restore();

    }

}

class WeaponNet extends Weapon{
    constructor() {
        super();
        this._bullet = NetBullet;
        this._cdTimer = 0;
        this._cdMax = 0.5;
        this._image = GameImages.player_net;
        this._imageScale = 0.3;
        this._icon  = GameImages.icon_net;
        this._speed = 100;
        this._range = 50;
        this._maxAmmo = 2;
        this._speedAdd = 1.2;
        this._rangeAdd = 0.16;
        this._ammoAdd = 0.4;
    }

    upgrade() {
        super.upgrade();
    }
}

class WeaponHarpoon extends Weapon{
    constructor() {
        super();
        this._bullet = HarpoonBullet;
        this._cdTimer = 0;
        this._cdMax = 0.5;
        this._image = GameImages.player_harpoon;
        this._imageScale = 1;
        this._icon  = GameImages.icon_harpoon;
        this._speed = 180;
        this._range = 5;
        this._maxAmmo = 3;
        this._speedAdd = 3.5;
        this._rangeAdd = 0.05;
        this._ammoAdd = 0.4;

    }

}

class WeaponBomb extends Weapon{
    constructor() {
        super();
        this._bullet = BombBullet;
        this._cdTimer = 0;
        this._cdMax = 0.5;
        this._image = GameImages.player_bomb;
        this._imageScale = 1;
        this._icon  = GameImages.icon_bomb;
        this._speed = 0.5;
        this._range = 20;
        this._maxAmmo = 5;
        this._speedAdd = 0.15;
        this._rangeAdd = 0.2;
        this._ammoAdd = 0.5;
    }


}

class Inventory {
    constructor(owner) {
        this._owner = owner;
        this.boardWidthTimer = 0;
        this._onOpen = false;
        this.net        = new WeaponNet();
        this.harpoon    = new WeaponHarpoon();
        this.bomb       = new WeaponBomb();
        // storage of weapons
        this._armory = new Map([
            ["net",     this.net],
            ["harpoon", this.harpoon],
            ["bomb",    this.bomb],
        ]);

        this._boardPosX = 910;
        this._boardPosY = 60;
        this._boardW = 450;
        this._boardH = 320;
    }

    open(){
        this._onOpen = true;
    }

    close(){
        this.boardWidthTimer = 0;
        this._onOpen = false;
    }

    bulletRetrieve(type){
        this._armory.get(type)._curAmmoCount--;
    }

    selectWeapon(weapon){
        // TODO maybe can limit user to rapidly change weapon based on gameplay
        // if(this._owner._bulletPrototypes.length) {
        //     hud_manager.message = "待ってください";
        //     return;
        // }
        this._owner.assignWeapon(this._armory.get(weapon));
    }

    drawBoard(){
        const w = this._boardW * this.boardWidthTimer;
        drawGridBoard(this._boardPosX,this._boardPosY,w,this._boardH,3,0,this.boardWidthTimer);

    }

    update(){

    }

    draw(){
        if(!this._onOpen) return;
        // draw the background board
        this.drawBoard();
        // fade in value update
        if(this.boardWidthTimer < 1) {
            this.boardWidthTimer += deltaTime;
            // hud_manager.current.
        }
        else {
        // draw items
            let y = this._boardPosY;
            let x = this._boardPosX - this._boardW + 75;

            let yStep = 50;
            const xStep = this._boardW/ this._armory.size;

            // first draw title
            global.c2d.save();
            global.c2d.font = `22px "Roboto Light", sans-serif`;
            global.c2d.fillStyle = 'white';
            global.c2d.fillText("INVENTORY", this._boardPosX - this._boardW + 90, y += 25);
            global.c2d.restore();
            // draw restaurant income
            global.c2d.save();
            global.c2d.font = `15px "Roboto Light", sans-serif`;
            global.c2d.fillStyle = 'white';
            global.c2d.fillText(player.restaurant.income +" 円", this._boardPosX - 60, y);
            global.c2d.restore();

            y += yStep;
            for (const [id, weapon] of this._armory) {
                weapon.draw(x, y);

                x += xStep;
            }
        }

    }

}

