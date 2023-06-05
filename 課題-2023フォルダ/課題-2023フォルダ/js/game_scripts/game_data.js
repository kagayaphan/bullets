// Enable Debug Mode to  Use Editor Tools to Modify this position
// Then press export to json then copy back to this json to modify button pos

var title_buttons_data = 
[
	{"x":700,"y":274,"width":120,"height":50,"content":"Start Game","fontFamily":"Arial","fontSize":18,"red":255,"green":89,"blue":65,"opacity":0.5,"clickHandler":"gotoMainScene","cornerRadius":15,"scale":1,"foregroundOver":"white","foregroundOri":"black","foreground":"black"},
	{"x":700,"y":345,"width":120,"height":50,"content":"Play Intro","fontFamily":"Arial","fontSize":18,"red":135,"green":135,"blue":255,"opacity":0.9,"clickHandler":"toggleParticles","cornerRadius":15,"scale":1,"foregroundOver":"white","foregroundOri":"black","foreground":"black"},
	{"x":700,"y":415,"width":120,"height":50,"content":"Credits","fontFamily":"Arial","fontSize":18,"red":135,"green":255,"blue":255,"opacity":0.5,"clickHandler":"gotoTitle","cornerRadius":15,"scale":1,"foregroundOver":"purple","foregroundOri":"black","foreground":"black"}
]


var game_buttons_data = 
[
	{"x":25,"y":20,"width":18,"height":18,"content":"icon_toTitle","fontFamily":"Arial","fontSize":18,"red":1,"green":1,"blue":1,"opacity":0.5,"clickHandler":"gotoTitle","cornerRadius":2,"scale":1,"foregroundOver":"white","foregroundOri":"black","foreground":"black"},
	{"x":930,"y":25,"width":36,"height":36,"content":"icon_inventory","fontFamily":"Arial","fontSize":18,"red":1,"green":1,"blue":1,"opacity":0,"clickHandler":"openInventory","cornerRadius":0,"scale":1,"foregroundOver":"white","foregroundOri":"black","foreground":"black"},
	{"x":350,"y":30,"width":36,"height":36,"content":"icon_nabe","fontFamily":"Arial","fontSize":18,"red":1,"green":1,"blue":1,"opacity":1,"clickHandler":"showRestaurant","cornerRadius":6,"scale":1,"foregroundOver":"white","foregroundOri":"black","foreground":"black"},
]

const GameImages = {
    nabe        : new LoadImage(global.c2d, "image/nabe.png"),
    nabefuta    : new LoadImage(global.c2d, "image/nabefuta.png"),
    crab        : new LoadImage(global.c2d, "image/crab.png"),
    octopus     : new LoadImage(global.c2d, "image/octopus.png"),
    squid       : new LoadImage(global.c2d, "image/squid.png"),
    title_bg    : new LoadImage(global.c2d, "image/title_bg.png"),
    boat        : new LoadImage(global.c2d, "image/boat.png"),
    stage01_bg  : new LoadImage(global.c2d, "image/stage_01.png"),
    stage02_bg  : new LoadImage(global.c2d, "image/stage_02.png"),
    title_logo  : new LoadImage(global.c2d, "image/title_logo.png"),

    // Player relate
    player_net  : new LoadImage(global.c2d, "image/weapon_net.png"),

    // button icons
    icon_nabe       : new LoadImage(global.c2d, "image/icon_nabe.png"),
    icon_crab       : new LoadImage(global.c2d, "image/icon_crab.png"),
    icon_oct        : new LoadImage(global.c2d, "image/icon_oct.png"),
    icon_squid      : new LoadImage(global.c2d, "image/icon_squid.png"),
    icon_toTitle    : new LoadImage(global.c2d, "image/icon_toTitle.png"),
    icon_setting    : new LoadImage(global.c2d, "image/icon_setting.png"),
    icon_inventory  : new LoadImage(global.c2d, "image/icon_inventory.png"),
}



