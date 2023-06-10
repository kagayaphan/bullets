/*
Monster Octopus class
 */


class Octopus extends Monster{
    constructor(spawnAt, scale) {
        super(GameImages.octopus,scale);
        this.type = "octopus";
        this._movePattern = this.createMovePattern(spawnAt);
        this._pos = this._movePattern[0];
        // TODO remove debug
        // this._pos = new Point(400,400);
        this._collider = new CircleCollider(this,25);
    }

    update(){

        super.update();
    }

    createMovePattern(spawnAt) {
        const posY = spawnAt.y;
        const points = [];

        // TODO make octopus move
        for(let x = spawnAt.x; x < Screen.width + 100; x += 50){
            const minY = randomNumber(-30,0);
            const maxY = randomNumber(0,150);
            const y = randomNumber(minY,maxY) + posY;
            const p = new Point(x,y);
            points.push(p);
        }
        // console.log(points);
        return points;
    }

}