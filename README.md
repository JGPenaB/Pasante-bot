# <div align="center">Pasante bot</div> 
<div align="center">¡Pequeño bot para Discord!</div><br>

<div align="center">

[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![MIT License](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

<br>Desarrollado por: [Jesús Peña](https://github.com/JGPenaB), [José Padrón](https://github.com/josevenezuelapadron), [César Escudero](https://github.com/cedaesca).
</div>

--------

<p style="text-align:justify;">Es un bot para nuestro server de Discord. Nació con el propósito de consultar criptomonedas, pero se incluyeron otras funciones igual de (in)útiles.</p>

**Funciones principales:**

* Consulta del Dólar paralelo (distintas fuentes: AirTM, DolarToday, LocalBitcoin...).

* Búsqueda de imágenes y vídeos.

* Búsqueda de preguntas en Stack Overflow.

* Búsqueda en la Wikipedia.

--------

## Instalación

### Dependencias

* Requiere Node.js >= 14.15

Instala las dependencias necesarias:

```
npm install
```

### Entorno

Crea un archivo `.env` con el siguiente comando:
```
cp .env.example .env
```

Luego, asigna el valor del token de tu bot a la variable `TOKEN`. Para obtener el token de tu bot de discord [sigue estos pasos](https://github.com/Chikachi/DiscordIntegration/wiki/How-to-get-a-token-and-channel-ID-for-Discord)):
```
TOKEN=DISCORD_TOKEN
```

Y de último, para ejecutarlo, usa el siguiente comando:

```
 npm start
```

--------

Hecho en NodeJS con la librería [discord.js](https://github.com/discordjs/discord.js/).

El bot hace uso de la API "[Stack Exchange API](https://api.stackexchange.com/docs)" para las búsquedas en Stack Overflow. Tanto el Stack Exchange API como Stack Overflow pertenecen a Stack Exchange Inc.

*The unified mark is a trademark of the Wikimedia Foundation and is used with the permission of the Wikimedia Foundation. We are not endorsed by or affiliated with the Wikimedia Foundation.*
