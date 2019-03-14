function def(cmd, user, users, bot, channelID, evt) {
  const query = cmd.substring(4);

  if (!query) {
    return bot.sendMessage({
      to: channelID,
      message: "",
      embed: {
        color: 5396735,
        footer: {
          text: `Querido usuario, lamento informarle que usted debe ingresar una pregunta para poder usar el comando !8b. Uselo de esta forma !8b {pregunta}`
        },
        image: {
          url: "https://www.bkconnection.com/system/refinery/blog/posts/thumbnails/000/003/323/post_detail/family-friendly-app-store.gif?1432824720"
        }
      }
    });
  }
  
  const answers = [
    'En mi opinión, sí',
    'Es cierto',
    'Es decididamente así',
    'Probablemente',
    'Buen pronóstico',
    'Todo apunta a que sí',
    'Sin duda',
    'Sí',
    'Sí - definitivamente',
    'Debes confiar en ello',
    'Respuesta vaga, vuelve a intentarlo',
    'Pregunta en otro momento',
    'Será mejor que no te lo diga ahora',
    'No puedo predecirlo ahora',
    'Concéntrate y vuelve a preguntar',
    'Puede ser',
    'No cuentes con ello',
    'Mi respuesta es no',
    'Mis fuentes me dicen que no',
    'Las perspectivas no son buenas',
    'Muy dudoso'
  ];
  
  const index = Math.floor(Math.random() * 21) + 1;
  
  return bot.sendMessage(
    {
      to: channelID,
      message: `Pregunta: ${query}\n\nRespuesta: ${answers[index - 1]}`
    }
  );
}

module.exports.def = def;

