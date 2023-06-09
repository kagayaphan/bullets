/*
Monster Squid class
 */


class Squid extends Monster{
    constructor(spawnAt, scale) {
        super(GameImages.squid,scale);
        this.type = "squid";
        this._movePattern = this.createMovePattern(spawnAt);
        this._pos = this._movePattern[0];
        // TODO remove debug
        this._collider = new CircleCollider(this,25);
    }

    update(){

        super.update();
    }

    createMovePattern(spawnAt) {
        // TODO make squid move
        const posY = spawnAt.y;
        const points = [new Point(spawnAt.x,spawnAt.y)];
        const stageY = stage_manager.current.playerInitInfo.pos.y;
        const maxMovePos = randomNumber(5,30);

        const outScreenRight = Screen.width +100;
        let suddenCount = 0;
        for(let x = spawnAt.x, i = 0 ; x < outScreenRight; x += 100,i++){
            const minY = randomNumber(stageY,posY);
            const maxY = randomNumber(posY,Screen.height + 50);
            const y = randomNumber(minY,maxY) ;


            if(randomNumber(1,10) > 5 && i > 5 && suddenCount < 5){
                x -= randomNumber(0,200);
                suddenCount++;
            }

            if(i === maxMovePos){
                if(randomNumber(1,10) > 5) x = -100;
                else x = outScreenRight;
                const p = new Point(x,y);
                points.push(p);
                break;
            }
            const p = new Point(x,y);
            points.push(p);
        }

        if(randomNumber(1,10) > 5){
            points.reverse();
        } else {
            // console.log("KO REVERSE");

        }
        return points;
    }

}