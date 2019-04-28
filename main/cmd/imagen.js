const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");

function def(cmd, user, users, bot, channelID, evt){
	/*
	| Si quieren saber como manejar la API, revisen la documentación del canvas API de Firefox:
	| https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
	*/
	let directory = "./main/temp/temp.png";
	
	const canvas = createCanvas(400, 400);
	const ctx = canvas.getContext("2d");
	const out = fs.createWriteStream(directory);
	const stream = canvas.createPNGStream();
	
	let message = cmd.substring(cmd.search(" ")+1);
 
    //Fondo de la imagen
	ctx.fillRect(0, 0, 400, 400);
	
	//Texto Impact para meeems
	ctx.font = "50px Impact";
	ctx.textAlign = "center";
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillText(message, 200, 230);
	ctx.strokeText(message, 200, 230);

	//console.log(canvas.toDataURL());
	stream.pipe(out);
	out.on("finish", () => {
		console.log("PNG creado");
		bot.uploadFile({
			to: channelID,
			file: directory
		}, function(error, response){console.log(error);});
	});
}

module.exports.def = def;