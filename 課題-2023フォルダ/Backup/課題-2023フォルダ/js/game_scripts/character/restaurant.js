/*
Player's Restaurant Properties
*/

// Monster sell price
    const monsterValue = {
        crab : 10,
        octopus : 100,
        squid : 250,
    }

// Player's restaurant class
    class Restaurant {
        constructor(owner){
            this.owner = owner;
            this.level = 1;

            this.crabStock = 0;
            this.octStock = 0;
            this.squidStock = 0;

            this.crabSales = 0;
            this.octSales = 0;
            this.squidSales = 0;

            this._crabSellTimer = 0;
            this._octSellTimer = 0;
            this._squidSellTimer = 0;

            this._crabNotifyEffectTimer = 1;
            this._octNotifyEffectTimer = 1;
            this._squidNotifyEffectTimer = 1;

            this.income  =  0;
            this._incomeNotifyEffectTimer = 0;

            this._displayFullInfo = false;
            this._boardCurWidth = 0;
            this._boardCurHeight = 0;
            this._boardOpacity = 0;
        }

    // All update
        update(){
            this.updateSale();
        }

    // when player catch a monster update stock info
        updateStock(monster){
            const type = monster.type;
            if     (type === "crab")  {
                this. _crabNotifyEffectTimer = 0;
                this.crabStock++;
            }
            else if(type === "octopus") {
                this. _octNotifyEffectTimer = 0;
                this.octStock++;
            }
            else if(type === "squid")     {
                this. _squidNotifyEffectTimer = 0;
                this.squidStock++;
            }
            this.owner.saveState();
        }

    // update selling state
        updateSale(){
            // sale is something demonstrate the business so it very randomly
            this.sellCrab();
            this.sellOctopus();
            this.sellSquid();
        }

    // request money
        requestMoney(money){
            if(this.income < money) return  false;
            this.income -= money;
            return true;
        }

    // add income func
        addIncome(income){
            this.income += income;
            this._incomeNotifyEffectTimer = 2;
            this.owner.saveState();
        }

    // upgrade restaurant
        upgrade(){
            if(this.level > restLevelUpChart.length) {
                hud_manager.setMessage("MAXIMUM LEVEL");
                return false;
            }
            let requireMoney = restLevelUpChart[this.level];
            if(_DEBUG) requireMoney = 10; // debug cheat
            if(this.income < requireMoney) {
                hud_manager.setMessage(localize.error_insufficient_funds);
                return false;
            }
            this.addIncome(-requireMoney);
            this.level++;
            this.owner.inventory.upgradeUnlock(this.level);
            hud_manager.setMessage(localize.success_upgrade);
            this.owner.saveState();
            return  true;
        }

    // update crab selling status
        sellCrab(){
            if(this.crabStock <= 0) return;
            if(this._crabSellTimer < 0){
                // TODO working with algorithm to random next sale time with restaurant lv
                this._crabSellTimer = randomNumber(5, 10);
                this.addIncome(monsterValue.crab * this.level * 1.1);
                this.crabStock--;
                this.crabSales++;
            } else {
                this._crabSellTimer -= deltaTime;
            }
        }

    // update octopus selling status
        sellOctopus(){
            if(this.octStock <= 0) return;
            if(this._octSellTimer < 0){
                this._octSellTimer = randomNumber(20, 30);
                this.addIncome(monsterValue.octopus * this.level * 1.2) ;
                this.octStock--;
                this.octSales++;

            } else {
                this._octSellTimer -= deltaTime;
            }
        }

    // update squid selling status
        sellSquid(){
            if(this.squidStock <= 0) return;
            if(this._squidSellTimer < 0){
                this._squidSellTimer = randomNumber(10, 50);
                this.addIncome(monsterValue.squid * this.level * 1.5) ;
                this.squidStock--;
                this.squidSales++;
            } else {
                this._squidSellTimer -= deltaTime;
            }
        }

    // Show all the restaurant state's info on the black board
        showInfoBoard(x,y){
            if(this._boardCurWidth < 225) this._boardCurWidth += 500 * deltaTime;
            if(this._boardCurHeight < 100) this._boardCurHeight += 500 * deltaTime;
            if(this._boardOpacity < 1) this._boardOpacity += deltaTime;
            const boardX = x;
            let boardY = y;
            let itemStepY = 22;
            drawBoard(boardX,boardY,this._boardCurWidth,this._boardCurHeight, this._boardOpacity);

            global.c2d.fillStyle = `rgba(0, 235, 0, ${this._boardOpacity})`;
            global.c2d.textAlign = "left";

            global.c2d.fillText("所得:",     boardX + 15,( boardY += itemStepY));

            global.c2d.fillText("カニ販売:", boardX + 15,( boardY += itemStepY));

            global.c2d.fillText("タコ販売:", boardX + 15,( boardY += itemStepY));

            global.c2d.fillText("イカ販売:", boardX + 15,( boardY += itemStepY));

            boardY = y;
            global.c2d.textAlign = "right";
            // display number
            global.c2d.fillText(this.income + "円",         boardX +180,( boardY += itemStepY));

            global.c2d.fillText(this.crabSales  + " 匹",    boardX +215,( boardY += itemStepY));

            global.c2d.fillText(this.octSales   + " 匹",    boardX +215,( boardY += itemStepY));

            global.c2d.fillText(this.squidSales + " 匹",    boardX +215,( boardY += itemStepY));

            // separate each item by line optional
        }

        closeInfoBoard(){
            this._boardOpacity = 0;
            this._boardCurWidth = 0;
            this._boardCurHeight = 0;
            player.restaurant._displayFullInfo = false;
        }

        drawHomepage(){
            this.showInfoBoard(1,10);
            global.c2d.textAlign = "center";
            this.drawStockSet(60,130);
            // draw restaurant image and its level
            let y = 160;
            GameImages.restaurant.Draw(-22,y,false,new Point(0.35,0.35),0);
            global.c2d.fillStyle = "white";

            global.c2d.fillText("Lv."+this.level, 120, y + 320);
        }

        drawStockSet(x,y){
            const red = 255 ;    // Value for red component
            const green = 255;    // Value for green component
            const blue = 255;   // Value for blue component

            const crab_color = "rgb(" + red*this._crabNotifyEffectTimer + ", " + green*this._crabNotifyEffectTimer + ", " + blue*this._crabNotifyEffectTimer + ")";
            const oct_color = "rgb(" + red*this._octNotifyEffectTimer + ", " + green*this._octNotifyEffectTimer + ", " + blue*this._octNotifyEffectTimer + ")";
            const squid_color = "rgb(" + red*this._squidNotifyEffectTimer + ", " + green*this._squidNotifyEffectTimer + ", " + blue*this._squidNotifyEffectTimer + ")";
            global.c2d.font = '400 15px "Roboto Light", sans-serif';
            global.c2d.fillStyle = crab_color;

            const xPosModifier = 50;
            const yPosModifier = 25;
            GameImages.icon_crab.Draw(          x, y, true);
            global.c2d.fillText(this.crabStock, x, y + yPosModifier);

            GameImages.icon_octopus.Draw(       x + xPosModifier, y, true);
            global.c2d.fillStyle = oct_color;
            global.c2d.fillText(this.octStock,  x + xPosModifier, y + yPosModifier);

            GameImages.icon_squid.Draw(          x + xPosModifier * 2, y, true);
            global.c2d.fillStyle = squid_color;
            global.c2d.fillText(this.squidStock, x + xPosModifier * 2, y + yPosModifier);

        }

        draw(){
            drawBoard(380,0,140,45,0.3); // draw a background for display stock item
            global.c2d.save();
            if(this._displayFullInfo){
                this.showInfoBoard(380,50);
            }

            global.c2d.font = '400 20px "Roboto", sans-serif';
            global.c2d.textAlign = "center";
            if(this._incomeNotifyEffectTimer > 0){
                this._incomeNotifyEffectTimer -= deltaTime;
                global.c2d.fillStyle = `rgba(0, 50, 240, ${this._incomeNotifyEffectTimer})`;

                global.c2d.fillText("¥" + this.income, 260, this._incomeNotifyEffectTimer * 10 + 10);

            }


            if(this._crabNotifyEffectTimer < 1){
                this._crabNotifyEffectTimer += deltaTime;
            }

            if(this._octNotifyEffectTimer < 1){
                this._octNotifyEffectTimer += deltaTime;
            }

            if(this._squidNotifyEffectTimer < 1){
                this._squidNotifyEffectTimer += deltaTime;
            }

            this.drawStockSet(400,15);

            global.c2d.restore(); // Restore font after render
        }
    }

