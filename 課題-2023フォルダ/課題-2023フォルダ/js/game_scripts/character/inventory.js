/*
* Player Inventory Class content weapon, item, etc...
* */



class Weapon{
    constructor() {
        this._bullet = null;
        this._cdTimer = 0;
        this._cdMax = 0;
        this._image = null;
        this._imageScale = 1;
        this._maxProjectile = 2;
        this.curProjectile = 0;
        this.durability = 100; // percentage of used status
    }
    initShot(target){
        const newBullet = new this._bullet(this._image, this._imageScale);
        newBullet.initShot(target);
        player._bulletPrototypes.push(newBullet);
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
        this._maxProjectile = 2;
    }
}

class Inventory {
    constructor(owner) {
        this._owner = owner;

        this.net        = new WeaponNet();
        this.harpoon    = new WeaponHarpoon();
        this.bomb       = new WeaponBomb();
        // storage of weapons
        this._armory = new Map([
            ["net",     this.net],
            ["harpoon", this.harpoon],
            ["bomb",    this.bomb],
        ]);
    }

    selectWeapon(weapon){
        this._owner.assignWeapon(this._armory.get(weapon));
    }

}