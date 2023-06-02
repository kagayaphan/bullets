// Enable Debug Mode to  Use Editor Tools to Modify this position
// Then press export to json then copy back to this json to modify button pos

var title_buttons_data = 
[
	{"x":700,"y":274,"width":120,"height":50,"content":"Start Game","fontFamily":"Arial","fontSize":18,"red":255,"green":89,"blue":65,"opacity":0.51,"clickHandler":"playParticles","cornerRadius":15,"scale":1,"foregroundOver":"white","foregroundOri":"black","foreground":"black"},
	{"x":700,"y":345,"width":120,"height":50,"content":"Play Intro","fontFamily":"Arial","fontSize":18,"red":135,"green":135,"blue":255,"opacity":0.8900000000000002,"clickHandler":"stopParticles","cornerRadius":15,"scale":1,"foregroundOver":"white","foregroundOri":"black","foreground":"black"},
	{"x":700,"y":415,"width":120,"height":50,"content":"Credits","fontFamily":"Arial","fontSize":18,"red":135,"green":255,"blue":255,"opacity":0.48,"clickHandler":"playParticles","cornerRadius":15,"scale":1,"foregroundOver":"purple","foregroundOri":"black","foreground":"black"}
]

const GameImages = {
    nabe        : new LoadImage(global.c2d, "image/nabe.png"),
    nabefuta    : new LoadImage(global.c2d, "image/nabefuta.png"),
    crab        : new LoadImage(global.c2d, "image/crab.png"),
    octopus     : new LoadImage(global.c2d, "image/octopus.png"),
    squid       : new LoadImage(global.c2d, "image/squid.png"),
    title_bg    : new LoadImage(global.c2d, "image/title_bg3.png")
}