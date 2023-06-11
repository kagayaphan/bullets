/*
 Game Quest & Quest Handler
 */

// TODO make a pub-sub to handle larger quest system

const d_questConditionCheat = 2;

function questCompleteStage01(quest){
    // check if current stage was the right stage to do quest
    if(stage_manager.current !== quest._handleStage) return;
    // get quest condition infos
    let condition = quest._condition[0];
    // if debug make quest use cheat
    if(_DEBUG) condition = d_questConditionCheat;
    // check quest condition
    if(player.restaurant.crabStock >= condition){
        player.moveToNextQuest();
        stage_manager.stage02.enable = true;
        const size = 30; // Specify the font size
        const displayTime = 1500; // Specify the display time in milliseconds

        drawQuestInstruct("Quest Completed! Stage 2 has been unlocked", Screen.centerW, Screen.centerH, size, displayTime);
        createExplosion(randomNumber(50,800),randomNumber(50,450),200);
        createExplosion(randomNumber(50,200),randomNumber(50,450),200);

    }
}

function questCompleteStage02(quest){
    if(stage_manager.current !== quest._handleStage) return;
    let condition = quest._condition[0];
    if(_DEBUG) condition = d_questConditionCheat;
    if(player.restaurant.octStock >= condition){
        player.moveToNextQuest();
        stage_manager.stage03.enable = true;
        const size = 30; // Specify the font size
        const displayTime = 1500; // Specify the display time in milliseconds

        drawQuestInstruct("Quest Completed! Stage 3 has been unlocked", Screen.centerW, Screen.centerH, size, displayTime);
        createExplosion(randomNumber(50,800),randomNumber(50,450),200);
        createExplosion(randomNumber(50,200),randomNumber(50,450),200);
        createExplosion(randomNumber(50,200),randomNumber(50,450),200);
    }
}

function questCompleteStage03(quest){
    // --- No more quest
    // let condition = quest._condition[0];
    // if(_DEBUG) condition = d_questConditionCheat;
    // if(stage_manager.current !== stage_manager.stage03) return;
    // const restaurant = player.restaurant;
    // const crabStock = restaurant.crabStock;
    // if(crabStock >= quest._condition[0]){
    //     player.moveToNextQuest();
    // }
}

class Quest {
    constructor(owner) {
        this._owner = owner;
        this._handler = null;
        this._title = "";
        this._info = "";
        this._condition = [];
        this._handleStage = null;
        this._enable = false;
    }

    update(){
        this._handler(this);
    }
}

const g_MainQuest = [];

function initQuest(){
    // Complete stage 01 quest
    {
        const completeStage = new Quest(player);
        completeStage._title = "Catch Crab in 石川県の海";
        completeStage._info = localize.quest_desc_01;
        completeStage._handler = questCompleteStage01;
        // TODO fix condition number
        completeStage._condition.push(25);
        completeStage._handleStage = stage_manager.stage01;

        g_MainQuest.push(completeStage);
    }

    // Complete stage 02 quest
    {
        const completeStage = new Quest(player);
        completeStage._title = "Catch Octopus in 津軽海峡";
        completeStage._info = localize.quest_desc_02;
        completeStage._handler = questCompleteStage02;
        // TODO fix condition number
        completeStage._condition.push(20);
        completeStage._handleStage = stage_manager.stage02;

        g_MainQuest.push(completeStage);
    }


    // Complete stage 03 quest
    {
        const completeStage = new Quest(player);
        completeStage._title = "Catch Squid in 東京湾";
        completeStage._info = localize.quest_desc_03;
        completeStage._handler = questCompleteStage03;
        // TODO fix condition number
        completeStage._condition.push(100);
        completeStage._handleStage = stage_manager.stage03;

        g_MainQuest.push(completeStage);
    }
}