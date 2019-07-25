function def(cmd, user, users, bot, channelID, evt) {
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

    function battle(callback) {
        connection.query('SELECT * FROM USUARIOS WHERE VIVO = "SI";', function (error, results, fields) {
            if (error) throw error;
            
            const vivos = results;

            if (vivos.length === 1) {
                reset(vivos[0].USERNAME);
                return callback("El ganador es: " + vivos[0].USERNAME);
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

    battle(function (data) {
        return bot.sendMessage({
            to: channelID,
            message: data
        });
    });

    setTimeout(() => {
        connection.end();
    }, 1000);
}

module.exports.def = def;