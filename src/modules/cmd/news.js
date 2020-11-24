const axios = require("axios");

/* 
    Lista de alias válidos para el comando
*/
function aliases(){
    return [
        "noticias",
        "news",
        "artículos",
        "articles"
    ]
}

/**
 * Información sobre el comando
 */
function help(){
    return {
        "usage": "!noticias {query}",
        "desc": "Trae noticias relevantes en base al query.",
        "example": "Busca un artículo con la palabra 'porgramación' en el título:\n!noticias programación\n\nPuedes mezclar palabras claves usando AND, OR y NOT:\n!noticias crypto AND (Ethereum OR litecoin) NOT bitcoin"
    }
}

/**
 * Función principal del comando
 * @param {*} cmd comando original
 * @param {*} user usuario que escribió el comando
 * @param {*} users lista de usuarios en el server
 * @param {*} bot el cliente
 * @param {*} channelID el canal donde se envió el comando
 * @param {*} evt lista de eventos
 */
function main(cmd, user, users, bot, channelID, evt) {

    let query = encodeURI(cmd.substring(cmd.search(" ")+1, cmd.length));
    let Fields = [];
    let current = new Date();

    axios.get(`http://newsapi.org/v2/everything?qInTitle=${query}&from=${current.toISOString()}pageSize=5&sortBy=publishedAt&language=en&apiKey=${process.env.NEWSKEY}`).then((noticias) => {
        
        if(noticias.data.articles.length > 0){
            Fields = noticias.data.articles.slice(0,5).map((data) => {
                return {
                    "name": `:newspaper: ${data.title}`,
                    "value": `${data.url}`
                };
            });
    
            bot.sendMessage({
                "to": channelID,
                "embed": {
                    "color": 2264407,
                    "title": ":newspaper2: Notícias más relevantes",
                    "fields": Fields
                }
            }, (error, response) => {
                if(error){
                    console.log(error);
        
                    bot.sendMessage({
                        "to": channelID,
                        "message": "Mano, estoy cansado. No puedo seguir escribiendo el resumen.",
                    });
                }
            });
        }else{
            bot.sendMessage({
                "to": channelID,
                "message": "Lo siento. no pude encontrar nada con esas palabras.",
            });
        }
        
    }).catch((error) => {
        console.log(error.response);
        bot.sendMessage({
            "to": channelID,
            "message": "Perdona, no sé cómo debo interpretar eso.",
        });
    });

}

module.exports = {aliases, help, main};