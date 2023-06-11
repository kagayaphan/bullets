/*
* Game Display Character Class
* */

let g_mapScale = 1;

let d_globalEnemySpeedMultiplier = 1; // debug param use to speed up enemy movement speed

const g_mob_move_destinationRadius = 2; // monster target collider radius

const g_object2D_default_speed = 100; // monster movement speed when state is normal
// 2D image object
class Object2D {
    constructor(sprite, scale) {
        this._pos = new Point(0,0);
        this._velo = new Point(0,0);
        this._movingVec = new Point(0,0);
        this._scale = new Point(scale, scale);
        this._scale.Mul(g_mapScale);

        this._angle = 0;
        this._state = "stop";

        this._scaleOri = new Point(scale, scale);
        this._speed = g_object2D_default_speed; // use this to effect the movement of monster
        this.sprite = sprite; // image
        this._collider = null; // box collider
    }

    update(){
        this._velo.Mul(this._speed * deltaTime);
        this._pos.Add(this._velo);
    }

    draw(){
        this.sprite.Draw(this._pos.x, this._pos.y, true, this._scale, this._angle);
    }

    remove(){
        this._collider = null;
        this._state = "dead";
    }
}

// Derived Monster class
class Monster extends Object2D{
    constructor(sprite, scale) {
        super(sprite,scale);
        // monster type init by specify derived class
        this.type = "";
        // score that reward player when killed
        this.reward = 0;
        // moving pattern list, one monster should have lots of pattern to random
        this._movePattern = [];
        // monster first spawn location
        this._pos = new Point(0,0);
        // current pattern index
        this._patIndex = 1;
        // current pattern speed modifier
        this._patSpeed = 1;
        // patter move timer use to move to next pattern when mob speed too low
        this._patTimer = 0;
        // deploy timer
        this._deployTimer = 0;
        // next deploy time
        this._nextDeployTime = 0;
        // being caught use params
        this._randAngle = randomNumber(0,360);
        this._randDistance = randomNumber(0,15);
    }

    gotCaught(){
        this._state = "caught";
        this._velo.x = 0;
        this._velo.y = 0;
    }

    update() {
        // skip update monster already dead
        if(this._state === "dead") return;

        if(this._state === "caught") {
            super.update();
            return;
        }
        // update monster is stopped to deploy state
        if(this._state === "stop") {
            this._deployTimer += deltaTime;
            if(this._deployTimer >= this._nextDeployTime) {
                this._deployTimer = 0;
                this._state = "move";
            }
            return;
        }
        // check if all move pattern done
        if (this._patIndex === this._movePattern.length) {
            this.remove();
            return;
        }

        const nextTargetPtr = this._movePattern[this._patIndex]; //pointer of current pattern point
        const nextTarget = new Point(nextTargetPtr.x, nextTargetPtr.y); // copy pointer value;

        // Check if reached location
        // TODO CCD collider check maybe need here with super fast movement speed
        if(nextTarget.Length(this._pos) < g_mob_move_destinationRadius * d_globalEnemySpeedMultiplier) {
            // console.log("doi pattern");
            this._patIndex++; // move to next pattern
            this._patSpeed = randomNumber(0, 100) * 0.01;
            this._patTimer = 0;
        }

        // prevent stay too long in 1 pattern
        if(this._patTimer > 2.5) {
            this._patIndex++; // move to next pattern
            this._patSpeed = randomNumber(0, 100) * 0.01;
            this._patTimer = 0;
        } else {
            this._patTimer += deltaTime;
        }
        // get next target vector
        nextTarget.Sub(this._pos);
        if(this.type === "squid"){
            // turning to the target direction
            let targetAngle = (nextTarget.Angle() * 180) / Math.PI;

            let angleDiff = targetAngle - this._angle;

            const turnSpeed = 5;
            angleDiff *= deltaTime * turnSpeed ;

            this._angle += angleDiff;
        }
        nextTarget.Normalize();
        this._velo = nextTarget;
        this._velo.Mul(this._patSpeed * d_globalEnemySpeedMultiplier);


        super.update();
    }

}



