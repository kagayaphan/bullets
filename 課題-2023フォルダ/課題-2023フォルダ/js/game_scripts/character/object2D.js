/*
* Game Display Character Class
* */

// 2D image object
class Object2D {
    constructor(sprite, scale) {
        this._pos = new Point(0,0);
        this._velo = new Point(0,0);
        this._scale = new Point(scale, scale);
        this._angle = 0;
        this._state = "stop";

        this._scaleOri = new Point(scale, scale);
        this._speed = 1;
        this.sprite = sprite;
        this._collider = null;
    }

    update(){
        this._velo.Mul(this._speed);
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
            // this._state = "dead";
            return;
        }

        const nextTargetPtr = this._movePattern[this._patIndex]; //pointer of current pattern point
        const nextTarget = new Point(nextTargetPtr.x, nextTargetPtr.y); // copy pointer value;
        // console.log("nexttarget");
        // console.log(nextTarget);
        // console.log("currentpos");
        // console.log(this._pos);
        // console.log("range");
        // Check if reached location
        if(nextTarget.Length(this._pos) < 1) {
            // console.log("doi pattern");
            this._patIndex++; // move to next pattern
            this._patSpeed = randomNumber(0, 100) * 0.01;
            this._patTimer = 0;
        }

        if(this._patTimer > 2.5) {
            this._patIndex++; // move to next pattern
            this._patSpeed = randomNumber(0, 100) * 0.01;
            this._patTimer = 0;
        } else {
            this._patTimer += deltaTime;
        }

        nextTarget.Sub(this._pos);
        nextTarget.Normalize();
        this._velo = nextTarget;
        this._velo.Mul(this._patSpeed);
        // this._velo.Mul(0);

        super.update();


    }

}



