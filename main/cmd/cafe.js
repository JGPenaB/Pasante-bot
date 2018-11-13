function def(cmd, user, users, bot, channelID, evt) {
  bot.sendMessage({
    to: channelID,
    message: "Aquí está su cafecito Sr. " + user
  });
}

module.exports.def = def;
