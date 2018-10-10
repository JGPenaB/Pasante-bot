function def(cmd, users, bot, channelID, evt){
	let x=0;
	let ID = evt.d.id;
	var handle = setInterval(function(){
							
							if(x<20){
							bot.sendMessage({
								to: channelID,
								message: x
							});
							x++;
							}else{
								clearInterval(handle);
							}
						},1000);
	console.log(handle);
};

module.exports.def = def;