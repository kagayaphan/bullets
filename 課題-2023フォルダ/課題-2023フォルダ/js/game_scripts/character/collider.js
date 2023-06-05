/*
Object Collider
*/

// this game only circle collider
class Collider {
    constructor(owner) {
        // this._collideWith = null;
        this._owner = owner;
    }

    collideWith(object2D){}
}

class CircleCollider extends Collider{
    constructor(owner, radius) {
        super(owner);
        this._radius = radius;

    }

    collideWith(object2D){
        const targetCol = object2D._collider;
        const targetObj2D = targetCol._owner;

        const targetPos = targetObj2D._pos;
        const r = this._radius + targetCol._radius;
        if(targetPos.Length(this._owner._pos) < r) {
            // objCol._collideWith = this;
            // this._collideWith = objCol;
            return true;
        }

        return false;
    }
}

// function detectCollisions() {
//     for (let i = 0; i < collider_objs.length; i++) {
//         const obj1 = collider_objs[i];
//         for (let j = i + 1; j < collider_objs.length; j++) {
//             const obj2d = collider_objs[j]._owner;
//             obj1.collideWith(obj2d);
//         }
//     }
//     // Continue the game loop
//     requestAnimationFrame(detectCollisions);
// }