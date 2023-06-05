/*
* Player Inventory Class content weapon, item, etc...
* */

function openInventory(){

}

class Weapon{
    constructor() {
        this._bullet = null;
        this._ammo = 0; // when this <= 0 player can not use this weapon
        this._cdTimer = 0;
        this._cdMax = 0;
    }
    initShot(target){
        const clonedBullet = Object.assign(Object.create(Object.getPrototypeOf(this._bullet)), this._bullet);
        clonedBullet.initShot(target);
        player._bulletPrototypes.push(clonedBullet);
    }
}

class WeaponNet extends  Weapon{
    constructor() {
        super();
        this._bullet = new NetBullet(GameImages.player_net, 0.3);
        this._ammo = 100; // when this <= 0 player can not use this weapon
        this._cdTimer = 0;
        this._cdMax = 0.5;
    }


}

class Inventory {
    constructor(owner) {
        this._owner = owner;
        this._weapons = [];



    }

}