const { Message } = require('discord.js')

const messages = require('../messages/help')

/**
 * Lista de alias válidos para el comando
 *
 * @return { Array<string> }
 */
const aliases = () => ['help', 'h', 'ayuda']

/**
 * Información sobre el comando
 *
 * @return { Object }
 */
const help = () => ({
  usage: '!ayuda',
  desc: 'Pasante muestra su curriculum',
  example: '!ayuda'
})

/**
 * Manejador del comando
 *
 * @param { Message } message Evento completo del mensaje
 */
const main = (message, _, commands) => {
  const subcmd = message.content.substring(1).split(' ')[1]

  if (!subcmd) {
    let cmdlist = ''

    //Armando la lista de comandos para presentarla
    Object.keys(commands).forEach((element) => {
      const cmdalias = commands[element].aliases()[0]

      if (cmdlist.indexOf(cmdalias) === -1) {
        cmdlist += '`' + cmdalias + '`, '
      }
    })

    //Elimina la última coma
    cmdlist = cmdlist.substring(0, cmdlist.length - 2)

    return message.channel.send('Buenos días a todos, soy pasante en este server porque necesito la experiencia para el currículum. Cualquier duda:', {
        embed: {
          color: 16749596,
          title: 'Pasante Bot',
          fields: [
            {
              name: 'Habilidades Técnicas:',
              value: cmdlist
            },
            {
              name: '¿Ayuda más específica?',
              value:
                'Usa el comando **!ayuda** seguido del nombre del comando que vayas a usar:\n`!ayuda dolar`\n`!ayuda define`\n`...`'
            },
            {
              name: 'Información de Contacto:',
              value:
                '[Repositorio en Github](https://github.com/JGPenaB/Pasante-bot), [Invítame a tu server](https://discord.com/api/oauth2/authorize?client_id=489634750156242974&permissions=2081422545&scope=bot)'
            }
          ]
        }
      }
    )
  }

  if (commands.hasOwnProperty(subcmd)) {
    const prefix = process.env.PREFIX

    //Pidiendo la información del comando con un formato específico
    const commandInfo = commands[subcmd].help()
    const commandAliases = commands[subcmd].aliases()

    let commandTitle = ''

    //Crea el título del comando en base a los alias existentes
    commandAliases.forEach((alias) => {
      commandTitle += prefix + alias + '   '
    })

    const index = Math.floor(Math.random() * messages.length) + 1
    const answer = messages[index - 1]

    return message.channel.send(answer, {
      embed: {
        color: 16749596,
        title: commandTitle,
        fields: [
          {
            name: 'Descripción:',
            value: commandInfo.desc
          },
          {
            name: 'Uso:',
            value: '`' + commandInfo.usage + '`'
          },
          {
            name: 'Ejemplos:',
            value: commandInfo.example
          }
        ]
      }
    })
  }
}

module.exports = { aliases, help, main }
