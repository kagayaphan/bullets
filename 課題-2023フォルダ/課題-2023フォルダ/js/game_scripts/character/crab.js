/*
Monster Crab class
 */


class Crab extends Monster{
    constructor(spawnAt, scale) {
        super(GameImages.crab,scale);
        this.type = "crab";
        this._movePattern = this.createMovePattern(spawnAt);
        this._pos = this._movePattern[0];
        // TODO remove debug
        this._collider = new CircleCollider(this,20);
    }

    update(){

        super.update();
    }

    createMovePattern(spawnAt) {
        const posY = spawnAt.y;
        const points = [];

        // crab move horizon end when meet screen edge right or left.
        for(let x = spawnAt.x; x < Screen.width + 100; x += 50){
            const minY = randomNumber(-40,0);
            const maxY = randomNumber(0,20);
            const y = randomNumber(minY,maxY) + posY;
            const p = new Point(x,y);
            points.push(p);
        }
        // console.log(points);
        return points;
    }

}