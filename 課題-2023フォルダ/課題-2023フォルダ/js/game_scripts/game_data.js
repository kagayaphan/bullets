// Enable Debug Mode to use editor tools to modify button object
// Then press export to json then copy back to this json to modify button pos

const title_buttons_data =
[
	{"x":700,"y":274,"width":120,"height":50,"content":"Start Game","fontFamily":"Roboto Light","fontSize":18,"red":255,"green":89,"blue":65,"opacity":0.5,"clickHandler":"gotoMainScene","cornerRadius":15,"scale":1,"foregroundOver":"white","foregroundOri":"black","foreground":"black"},
	{"x":700,"y":345,"width":120,"height":50,"content":"Play Intro","fontFamily":"Roboto Light","fontSize":18,"red":135,"green":135,"blue":255,"opacity":0.9,"clickHandler":"playIntro","cornerRadius":15,"scale":1,"foregroundOver":"white","foregroundOri":"black","foreground":"black"},
	{"x":700,"y":415,"width":120,"height":50,"content":"Credits","fontFamily":"Roboto Light","fontSize":18,"red":135,"green":255,"blue":255,"opacity":0.5,"clickHandler":"gotoTitle","cornerRadius":15,"scale":1,"foregroundOver":"purple","foregroundOri":"black","foreground":"black"}
]


const game_buttons_data =
[
	{"x":25,"y":20,"width":18,"height":18,"content":"icon_toTitle","fontFamily":"Roboto Light","fontSize":18,"red":1,"green":1,"blue":1,"opacity":0.5,"clickHandler":"gotoHome","cornerRadius":0,           "scale":1,"foregroundOver":"white","foregroundOri":"black","foreground":"black"},
	{"x":930,"y":25,"width":36,"height":36,"content":"icon_inventory","fontFamily":"Roboto Light","fontSize":18,"red":1,"green":1,"blue":1,"opacity":0,"clickHandler":"openInventory","cornerRadius":0,     "scale":1,"foregroundOver":"white","foregroundOri":"black","foreground":"black"},
	{"x":350,"y":30,"width":36,"height":36,"content":"icon_nabe","fontFamily":"Roboto Light","fontSize":18,"red":1,"green":1,"blue":1,"opacity":1,"clickHandler":"toggleShowRestaurant","cornerRadius":0,   "scale":1,"foregroundOver":"white","foregroundOri":"black","foreground":"black"},
]

const home_buttons_data =
[
	{"x":437,"y":275,"width":80,"height":80,"content":"icon_mapLocator","fontFamily":"Roboto Light", "fontSize":18,"red":0,"green":0,"blue":0,"opacity":1,"clickHandler":"getStageInfo01","cornerRadius":0,"scale":1,"foregroundOri":"black","foregroundOver":"white"},
	{"x":398,"y":156,"width":80,"height":80,"content":"icon_mapLocator","fontFamily":"Roboto Light","fontSize":18,"red":0,"green":0,"blue":0,"opacity":1,"clickHandler": "getStageInfo02","cornerRadius":0,"scale":1,"foregroundOri":"black","foregroundOver":"white"},
	{"x":558,"y":245,"width":80,"height":80,"content":"icon_mapLocator","fontFamily":"Roboto Light","fontSize":18,"red":0,"green":0,"blue":0,"opacity":1,"clickHandler": "getStageInfo03","cornerRadius":0,"scale":1,"foregroundOri":"black","foregroundOver":"white"},
    {"x":851,"y":449,"width":80,"height":50,"content":"出発",           "fontFamily":"Roboto Light","fontSize":18,"red":28,"green":184,"blue":0,"opacity":0.78,"clickHandler":"navigateStage","cornerRadius":5,"foregroundOri":"black","foregroundOver":"white","scale":1},
    {"x":15, "y":469,"width":18,"height":18,"content":"icon_toTitle",   "fontFamily":"Roboto Light","fontSize":18,"red":1,"green":1,"blue":1,"opacity":0.5,"clickHandler":"gotoTitle","cornerRadius":0, "scale":1,"foregroundOver":"white","foregroundOri":"black","foreground":"black"},
    {"x":117,"y":449,"width":80,"height":20,"content":"アップグレード", "fontFamily":"Roboto Light","fontSize":10,"red":0,"green":0,"blue":0,"opacity":0.8,"clickHandler":"upgradeRestaurant","cornerRadius":1, "scale":1,"foregroundOver":"orange","foregroundOri":"white","foreground":"black"},


]

const inventory_buttons_data =
[
	{"x":930,"y":25,"width":36,"height":36,"content":"icon_inventory","fontFamily":"Roboto Light","fontSize":18,"red":1,"green":1,"blue":1,"opacity":0,"clickHandler":"closeInventory","cornerRadius":0,"scale":1,"foregroundOver":"white","foregroundOri":"black","foreground":"black"},
    {"x":485,"y":350,"width":90,"height":30,"content":"UPGRADE","fontFamily":"Roboto Light","fontSize":14,"red":148,"green":174,"blue":125,"opacity":0.7,"clickHandler":"upgradeNet","cornerRadius":4,"foregroundOri":"black","foregroundOver":"white","scale":1},
    {"x":655,"y":350,"width":90,"height":30,"content":"UPGRADE","fontFamily":"Roboto Light","fontSize":14,"red":148,"green":174,"blue":125,"opacity":0.7,"clickHandler":"upgradeHarpoon","cornerRadius":4,"foregroundOri":"black","foregroundOver":"white","scale":1},
    {"x":830,"y":350,"width":90,"height":30,"content":"UPGRADE","fontFamily":"Roboto Light","fontSize":14,"red":148,"green":174,"blue":125,"opacity":0.7,"clickHandler":"upgradeBomb","cornerRadius":4,"foregroundOri":"black","foregroundOver":"white","scale":1},

]



const GameImages = {
    nabe        : new LoadImage(global.c2d, "image/nabe.png"),
    nabefuta    : new LoadImage(global.c2d, "image/nabefuta.png"),
    crab        : new LoadImage(global.c2d, "image/crab.png"),
    octopus     : new LoadImage(global.c2d, "image/octopus.png"),
    squid       : new LoadImage(global.c2d, "image/squid.png"),
    boat        : new LoadImage(global.c2d, "image/boat.png"),
    // world_map   : new LoadImage(global.c2d, "image/world_map.png"),
    world_map   : new LoadImage(global.c2d, "image/japan_map.jpg"),
    title_bg    : new LoadImage(global.c2d, "image/title_bg.png"),
    stage01_bg  : new LoadImage(global.c2d, "image/stage_01.png"),
    stage02_bg  : new LoadImage(global.c2d, "image/stage_02.png"),
    stage03_bg  : new LoadImage(global.c2d, "image/stage_03.png"),
    title_logo  : new LoadImage(global.c2d, "image/title_logo.png"),
    restaurant   : new LoadImage(global.c2d, "image/restaurant.png"),

    // Player weapon
    player_net      : new LoadImage(global.c2d, "image/weapon_net.png"),
    player_harpoon  : new LoadImage(global.c2d, "image/harpoon.png"),
    player_bomb     : new LoadImage(global.c2d, "image/bomb.png"),

    // --- icon ---
    // restaurant icons
    icon_nabe       : new LoadImage(global.c2d, "image/icon_nabe.png"),
    icon_crab       : new LoadImage(global.c2d, "image/icon_crab.png"),
    icon_octopus    : new LoadImage(global.c2d, "image/icon_octopus.png"),
    icon_squid      : new LoadImage(global.c2d, "image/icon_squid.png"),
    // button
    icon_toTitle    : new LoadImage(global.c2d, "image/icon_toTitle.png"),
    icon_inventory  : new LoadImage(global.c2d, "image/icon_inventory.png"),
    icon_mapLocator : new LoadImage(global.c2d, "image/icon_mapLocator.png"),
    // weapon
    icon_net        : new LoadImage(global.c2d, "image/icon_net.png"),
    icon_harpoon    : new LoadImage(global.c2d, "image/icon_harpoon.png"),
    icon_bomb       : new LoadImage(global.c2d, "image/icon_bomb.png"),
}

const restLevelUpChart = [0,3000,10000,15000,25000,12000,15000];

const stageDescription = {
    stageHome : [
        ["釣りをするエリアを選択してください。"],
        [""],
        ["注: 各領域には独自のプロパティ"],
        ["のセットがあります。"],
        [""],
        ["ビジネスの状況に合わせて"],
        ["レストランの地域を"],
        ["慎重に選択してください"],
        [""],
        ["時間を無駄にしないように。"],
        ["。。。"],
        [""],
    ],
    stage01 : [
        ["石川県の海"],
        ["作業時間: ９０秒"],
        ["種比"],
        ["カニ：８０％"],
        ["タコ：２０％"],
        ["。。。"],
        [""],
    ],

    stage02 : [
        ["津軽海峡"],
        ["作業時間: ８０秒"],
        ["種比"],
        ["カニ：６０％"],
        ["タコ：３５％"],
        ["イカ：５％"],
        ["。。。"],
    ],
    stage03 : [
        ["東京湾"],
        ["作業時間:１２０秒"],
        ["種比"],
        ["カニ：５％"],
        ["タコ：４５％"],
        ["イカ：５０％"],
        ["。。。"],
    ],
}




