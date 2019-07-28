function def(cmd, user, users, bot, channelID, evt) {
	var ncmd = cmd.split(" ");
    const mysql = require('mysql');
    var textos = [];

    const connection = mysql.createConnection({
        host     : process.env.BATTLE_DB_URL,
        user     : process.env.BATTLE_DB_USER,
        password : process.env.BATTLE_DB_PASS,
        database : process.env.BATTLE_DB_NAME
    });

    connection.connect();

    connection.query('SELECT * FROM TEXTOS WHERE USADO = "NO";', function (error, results, fields) {
        textos = results;
    });

    function setNo(id, tipo) {
        if (tipo == "texto") {
            connection.query(`UPDATE TEXTOS SET USADO = "SI" WHERE ID = ${id};`);
        } else if (tipo == "usuario") {
            connection.query(`UPDATE USUARIOS SET VIVO = "NO" WHERE ID = ${id};`);
        }
    }

    function reset(username) {
        connection.query(`UPDATE TEXTOS SET USADO = "NO";`);
        connection.query(`UPDATE USUARIOS SET VIVO = "SI";`);
        connection.query(`INSERT INTO GANADORES VALUES(NULL, '${username}', NOW());`);
    }
	
	//Función principal
    function battle(callback) {
        connection.query('SELECT * FROM USUARIOS WHERE VIVO = "SI";', function (error, results, fields) {
            if (error) throw error;
            
            const vivos = results;

            if (vivos.length === 1) {
                reset(vivos[0].USERNAME);
                return callback("El ganador es: **" + vivos[0].USERNAME + "**");
            }

            let texto = textos[Math.floor(Math.random()*textos.length)];

            setNo(texto.ID, "texto");

            let user1 = Math.floor(Math.random()*vivos.length);
            let user2 = Math.floor(Math.random()*vivos.length);

            setNo(vivos[user2].ID, "usuario");
            
            if (user1 == user2) {
                return battle(callback);
            }

            texto = texto.TEXTO;
            texto = texto.replace(/{P1}/gi, vivos[user1].USERNAME);
            texto = texto.replace(/{P2}/gi, vivos[user2].USERNAME);

            return callback(texto);
        });
    }
	
	//Vivos
	function alive(callback) {
        connection.query('SELECT * FROM USUARIOS WHERE VIVO = "SI";', function (error, results, fields) {
            if (error) throw error;
            
            const vivos = results;
			
			let texto = "";
			
			for(let i=0; i<vivos.length; ++i){
				texto += vivos[i].USERNAME+"\n";
			}

            return callback(texto);
        });
    }
	
	//Muertos
	function dead(callback) {
        connection.query('SELECT * FROM USUARIOS WHERE VIVO = "NO";', function (error, results, fields) {
            if (error) throw error;
            
            const vivos = results;
			
			let texto = "";
			
			for(let i=0; i<vivos.length; ++i){
				texto += vivos[i].USERNAME+"\n";
			}

            return callback(texto);
        });
    }
	
	//Ganadores
	function winners(callback) {
        connection.query('SELECT USERNAME, COUNT(USERNAME) as C FROM GANADORES GROUP BY USERNAME ORDER BY C DESC LIMIT 3;', function (error, results, fields) {
            if (error) throw error;
            
            const top3 = results;
			
			let texto = "";
			
			for(let i=0; i<top3.length; ++i){
				texto += top3[i].USERNAME+": "+top3[i].C+"\n";
			}

            return callback(texto);
        });
    }
	
	if(ncmd[1] === undefined)
	{
		battle(function (data) {
			return bot.sendMessage({
				to: channelID,
				message: data
			});
		});
	}else{
		switch(ncmd[1].toLowerCase()){
			case "vivos":
				alive(function (data) {
					return bot.sendMessage({
						to: channelID,
						message: '',
						embed: {
							color: 2264407,
							title: 'Battle Royale',
							fields: [
								{
									name: "Lista de usuarios vivos",
									value: data
								}
							]
						}
					}, function(error, response){if (error) console.log(error);});
				});
			break;
			
			case "muertos":
				dead(function (data) {
					return bot.sendMessage({
						to: channelID,
						message: '',
						embed: {
							color: 15138821,
							title: 'Battle Royale',
							fields: [
								{
									name: "Lista de usuarios muertos",
									value: data
								}
							]
						}
					}, function(error, response){if (error) console.log(error);});
				});
			break;
			
			case "ganadores":
				winners(function (data) {
					return bot.sendMessage({
						to: channelID,
						message: '',
						embed: {
							color: 16749596,
							title: 'Battle Royale',
							fields: [
								{
									name: "Top 3 de jugadores",
									value: data
								}
							]
						}
					}, function(error, response){if (error) console.log(error);});
				});
			break;
			
			default:
				bot.sendMessage({
					to: channelID,
					message: "Parámetro no reconocido. Intenta esto:\n!battle **vivos**\n!battle **muertos**\n!battle **ganadores**"
				});
		}
	}

    setTimeout(() => {
        connection.end();
    }, 1000);
}

module.exports.def = def;