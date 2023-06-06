/*
Player Class & Bullets
 */

class Player extends Object2D {
    constructor(sprite, scale) {
        super(sprite, scale);
        this._reward    = 0;
        this._animTimer = 0;
        this.restaurant = new Restaurant(this);
        // -- Weaponry
        this.inventory = new Inventory(this);
        this._weapon = null;
        this._bulletPrototypes = [];
    }

    notifyRestaurant(caughtMonsters){
        for(const caughtObj of caughtMonsters){
            this.restaurant.updateStock(caughtObj);
            // caughtObj.remove();
        }
    }

    assignWeapon(selectedWeapon){
        this._weapon = selectedWeapon;
    }

    update() {
        this.animate();
        this.weaponUpdate();
        super.update();
    }

    initShot(target) {
        this._weapon.initShot(target);
    }

    weaponUpdate() {
        let deadBullets = [];
        for(const bullet of this._bulletPrototypes) {
            if(bullet._state === "dead"){
                deadBullets.push(bullet);
                continue;
            }
            bullet.update();
        }
        // splice dead object out of array
        for (const deadBullet of deadBullets) {
            const index = this._bulletPrototypes.indexOf(deadBullet);
            if (index !== -1) {
                this._bulletPrototypes.splice(index, 1);
            }
        }
    }


    animate(){
        // give boat a little bit move to make it look like floating on the wave
        let randVar = randomNumber(0,4) * Math.PI / 180;
        let step = Math.sin(Date.now() * 0.001)
        this._angle += randVar *  step;
        this._pos.x += step * randVar * 2;
    }

    resetState(){
        this._pos = stage_manager.current.playerPos;
        this._angle = 0;
        this._bulletPrototypes = []
    }

    draw(){
        for(const bullet of this._bulletPrototypes){
            bullet.draw();
        }        
        super.draw();

        this.restaurant.draw();
    }
}


// --- Bullet Base Class
class Bullet extends Object2D {
    constructor(sprite, scale) {
        super(sprite, scale);
        this._type = "";
        this._initPos = null;
        this._target = null; // mouse click on target
        this._headPos = new Point(0,0); // param to set caught monster at the right place
        this._caughtObj = [];
    }

    initShot(target){
        // make sure nothing inside caught object array
        this._caughtObj = [];
        // create collider
        this._collider  = new CircleCollider(this, 20);
        // set offset position with boat's position
        this._pos       = new Point(player._pos.x + 20,player._pos.y + 50);
        // remember init position
        this._initPos   = new Point(player._pos.x + 20,player._pos.y + 50);
        // remember target position
        this._target    = target;
        // change state to shot
        this._state     = "shot";
        // Calculate angle between bullet position and target position in degree
        this._angle     = this._pos.Angle(this._target) * (180 / Math.PI) ;
   
    }

    update(){
        const target = new Point(this._target.x, this._target.y); // copy pointer value;
        if(this._type === "bomb") {
            if(this._pos.Length(this._initPos) > 1000) {
                this.remove();
                return;
            }
        }
        //***** CHECK IF REACH TARGET ******//
        if(target.Length(this._pos) < g_mob_move_destinationRadius * 2) {
            if(this._state === "shot") {
                if(this._type === "bomb") {
                    // dont stop moving forward if this is bomb
                    return;
                }
                // ending moving forward => moving back now
                this._state = "retrieve";
                this._target = this._initPos;
            } else {
                // moving back state done object ready to be destructed
                player.notifyRestaurant(this._caughtObj);
                this.remove();
                return;
            }
        }

        target.Sub(this._pos);
        target.Normalize();
        this._velo = target;

        // super.update();
    }

    remove(){
        for(const obj of this._caughtObj){
            obj.remove();
        }
        this._caughtObj = [];
        super.remove();
    }

}

class NetBullet extends Bullet {
    constructor(sprite, scale) {
        super(sprite, scale);
        this._type = "net";
        this._speed = 10;
        this._ropeColor = "rgb(204, 85, 0)";
    }

    initShot(target) {
        // assign scale size at minimum to enlarge it when move
        this._scale     = new Point(0.1,0.1);
        super.initShot(target);
    }

    update() {
        // compare traveled distance with target's travel distance to get scale ratio
        // to enlarge the size of net to make a simple animation
        if(this._state === "shot"){
            const travel_max_distance = this._target.Length(this._initPos);
            const travel_cur = this._pos.Length(this._initPos);
            const rate = travel_cur / travel_max_distance;
            this._scale.x = rate * this._scaleOri.x;
            this._scale.y = rate * this._scaleOri.y;
        } else {
            this.checkCollide();
            // moving back scale rate decrease overtime
            // need to keep the net not turn into very small
            const shrinkSpd = 0.015 * deltaTime;

            this._scale.x -= shrinkSpd;
            this._scale.y -= shrinkSpd;

            this._movingVec.x = this._target.x;
            this._movingVec.y = this._target.y;
            this._movingVec.Sub(this._pos);
            this._movingVec.NormalizeScale(100);
            this._movingVec.Neg();
            this._headPos.x = this._pos.x + this._movingVec.x;
            this._headPos.y = this._pos.y + this._movingVec.y;
            this._collider._pos = this._headPos;

        }

        // Set mobs randomly stay on the net position
        for(const caughtObj of this._caughtObj){
            if(caughtObj._state !== "caught") continue;
            // Get the net center pos then distribute by preset value
            let randomPos = new Point(this._headPos.x,this._headPos.y);
            // Convert angle from degrees to radians
            let angleInRadians = (caughtObj._randAngle * Math.PI) / 180;
            // Calculate the new point
            let offsetX = Math.cos(angleInRadians) * caughtObj._randDistance;
            let offsetY = Math.sin(angleInRadians) * caughtObj._randDistance;
            // assign new offset to obj
            caughtObj._pos = new Point(randomPos.x + offsetX, randomPos.y + offsetY);
        }

        super.update();
    }

    draw() {
        super.draw();

        drawLine(this._initPos, this._pos, 2, this._ropeColor);

        if(_DEBUG) {
            if(this._collider) this._collider.draw();
        }
    }


    checkCollide(){
        if(!this._collider) return;

        for(const monster of stage_manager.current.monsterList){
            // skip monster that been caught
            if(monster._state !== "move") continue;
            const collider = monster._collider;
            if(collider){
                // if collideWith obj was exists it mean we got a crab
                if(this._collider.collideWith(monster)){
                    if(_DEBUG) console.log("GOT CRAB");
                    this._caughtObj.push(monster);
                    monster.gotCaught();
                }
            }
        }
    }
}

class HarpoonBullet extends Bullet {
    constructor(sprite, scale) {
        super(sprite, scale);
        this._type = "harpoon";
        this._speed = 20;
        this._ropeColor = "rgb(255,255,255)";
    }

    update() {
        // this._movingVec = new Point(this._target.x, this._target.y);
        this._movingVec.x = this._target.x;
        this._movingVec.y = this._target.y;
        this._movingVec.Sub(this._pos);
        this._movingVec.NormalizeScale(this.sprite.img.width/2);
        if(this._state === "shot"){

            this._headPos.x = this._pos.x + this._movingVec.x;
            this._headPos.y = this._pos.y + this._movingVec.y;
            this._collider._pos = this._headPos;
           // can catch monster while moving forward
            this.checkCollide();

        } else {
            // update head position but with reverse vector
            this._movingVec.Neg();
            this._headPos.x = this._pos.x + this._movingVec.x;
            this._headPos.y = this._pos.y + this._movingVec.y;
            this._collider._pos = this._headPos;
        }

        // Set mobs randomly stay on the net position
        for(const caughtObj of this._caughtObj){
            if(caughtObj._state !== "caught")  continue;
            // Get the net center pos then distribute by preset value
            let randomPos = new Point(this._headPos.x,this._headPos.y);
            // Convert angle from degrees to radians
            let angleInRadians = (this._angle * Math.PI) / 180;

            // Calculate the new point
            let offsetX = Math.cos(angleInRadians) * caughtObj._randDistance;
            let offsetY = Math.sin(angleInRadians) * caughtObj._randDistance;
            // assign new offset to obj
            caughtObj._pos = new Point(randomPos.x + offsetX, randomPos.y + offsetY);
        }

        super.update();
    }

    draw() {
        super.draw();
        this._movingVec.Neg()
        this._movingVec.Add(this._pos);
        drawLine(this._initPos, this._movingVec, 2, this._ropeColor);

        if(_DEBUG) {
            if(this._collider) this._collider.draw();
        }
    }


    checkCollide(){
        if(!this._collider) return;

        for(const monster of stage_manager.current.monsterList){
            // skip monster that been caught
            if(monster._state !== "move") continue;
            const collider = monster._collider;
            if(collider){
                // if collideWith obj was exists it mean we got a crab
                if(this._collider.collideWith(monster)){
                    if(_DEBUG) console.log("Hit Monster by Harpoon");
                    this._caughtObj.push(monster);
                    monster.gotCaught();
                    monster._randDistance = randomNumber(-25,1);
                }
            }
        }
    }
}

class BombBullet extends Bullet {
    constructor(sprite, scale) {
        super(sprite, scale);
        this._type = "bomb";
        this._speed = 0.5;
        this._acceleration  = 5;
    }

    update() {

        // shuffle rocket moving pattern
        this._speed += (this._acceleration * this._acceleration ) / 2000000;
        this._acceleration += 0.1;
        const dx = this._target.x - this._initPos.x;
        const dy = this._target.y - this._initPos.y;
        const angle = Math.atan2(dy, dx); // Calculate the angle towards the end point
        // const num = randomNumber(1,9)/10;
        const angleChange = Math.sin(this._pos.x / 100) * 0.2; // Funny angle change based on x position
        const directionX = Math.cos(angle + angleChange);
        const directionY = Math.sin(angle + angleChange);
        this._pos.x += directionX * this._speed;
        this._pos.y += directionY * this._speed;

        // always update collider pos;
        this._collider._pos = this._pos;
        this.checkCollide();

        super.update();
    }

    draw() {
        super.draw();


        if(_DEBUG) {
            if(this._collider) this._collider.draw();
        }
    }


    checkCollide(){
        if(!this._collider) return;
        let collided = false;
        for(const monster of stage_manager.current.monsterList){
            // skip monster that been caught
            if(monster._state !== "move") continue;
            const collider = monster._collider;
            if(collider){
                // if collideWith obj was exists it mean we got a crab
                if(this._collider.collideWith(monster)){
                    if(_DEBUG) console.log("hit by Bomb");
                    // stop monster
                    monster._speed = 0;
                    // modify collider radius to effect the others
                    this._collider._radius = 100;
                    // explode the bomb
                    collided = true;
                }
            }
        }
        if(collided) {
            playExplosion(this._pos.x, this._pos.y);
            this.remove();
        }
    }
}





