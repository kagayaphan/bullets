/*
Player Class
 */

class Player extends Object2D {
    constructor(sprite, scale) {
        super(sprite, scale);
        this._reward = 0;
        this.speed = 1;
        this._animTimer = 0;
        this.restaurant = new Restaurant();
        // -- Weaponry
        this._weapon = null;
        this._bulletPrototypes = [];
    }

    notifyRestaurant(caughtMonsters){
        for(const caughtObj of caughtMonsters){
            this.restaurant.updateStock(caughtObj);
            caughtObj.remove();
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
        for(const bullet of this._bulletPrototypes){
            bullet.update();
            if(bullet._state === "dead"){
                deadBullets.push(bullet);
            }
        }

        for (const deadBullet of deadBullets) {
            const index = this._bulletPrototypes.indexOf(deadBullet);
            if (index !== -1) {
                // console.log("REMOVED");
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



class Rope extends Object2D {
    constructor(sprite, scale) {
        super(sprite, scale);
        this._target = null;
        this._startingPos = 0;
        this._netPos = null;
    }
    update() {
        let travel_max_distance = this._target.Length(this._startingPos);
        let travel_cur = this._netPos.Length(this._startingPos);
        this._scale.x = travel_cur / travel_max_distance;
        super.update();
    }

    draw() {
        this.sprite.Draw(this._pos.x, this._pos.y, false, this._scale, this._angle);
    }
}


class Bullet extends Object2D {
    constructor(sprite, scale) {
        super(sprite, scale);
        this._initPos = null;
        this._target = null; // mouse click on target
        this._headPos = new Point(0,0); // param to set caught monster at the right place
        this._caughtObj = [];
    }

    initShot(target){
        this._caughtObj = [];
        this._collider = new CircleCollider(this, 20);
        this._scale = new Point(0.1,0.1);
        this._pos = new Point(player._pos.x + 20,player._pos.y + 50);
        this._initPos = new Point(player._pos.x + 20,player._pos.y + 50);
        this._target = target;
        this._state = "shot";
        // Calculate angle between bullet position and target position
        this._angle = this._pos.Angle(this._target) * (180 / Math.PI) ;// angle must be set to degree
   
    }

    update(){
        const target = new Point(this._target.x, this._target.y); // copy pointer value;

        if(target.Length(this._pos) < 1) {
            if(this._state === "shot") {
                // moving forward state done
                this._state = "retrieve";
                this._target = this._initPos;
            } else {
                // moving back state done
                this.remove();
                player.notifyRestaurant(this._caughtObj);
                return;
            }
        }

        target.Sub(this._pos);
        target.Normalize();
        this._velo = target;
        this._velo.Mul(this._speed);

        super.update();
    }

}

class NetBullet extends Bullet {
    constructor(sprite, scale) {
        super(sprite, scale);
        this._speed = 10;
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
            this._scale.y -= shrinkSpd ;

            // update head position but with reverse vector
            const movingVec = new Point(this._target.x, this._target.y);
            movingVec.Sub(this._pos);
            movingVec.NormalizeScale(100);
            movingVec.Neg();
            this._headPos.x = this._pos.x + movingVec.x;
            this._headPos.y = this._pos.y + movingVec.y;
            this._collider._pos = this._headPos;
        }

        for(const caughtObj of this._caughtObj){
            if(caughtObj._state !== "caught") continue;
            // Set mobs randomly stay on the net position
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
        const ctx = global.c2d;
        // Start the path
        ctx.beginPath();

        // Set the starting point
        ctx.moveTo(this._initPos.x, this._initPos.y);

        // Set the end point and draw the line
        ctx.lineTo(this._pos.x, this._pos.y);

        // Set line style properties (optional)
        ctx.strokeStyle = "rgb(204, 85, 0)";
        ctx.lineWidth = 2;

        // Stroke the line
        ctx.stroke();
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





