# <div align="center">Pasante bot</div> 
<div align="center">¡Pequeño bot para Discord!</div><br>

<div align="center">

[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![MIT License](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

<br>Desarrollado por: [Jesús Peña](https://github.com/JGPenaB), [José Padrón](https://github.com/josevenezuelapadron).
</div>

--------

<p style="text-align:justify;">Es un bot para nuestro server de Discord . Nació con el propósito de consultar criptomonedas, pero se incluyeron otras funciones igual de (in)útiles.</p>

**Funciones principales:**

* Consulta del Dólar paralelo (DolarToday y AirTm).

* Búsqueda de imágenes y vídeos.

* Búsqueda de preguntas en Stack Overflow.

* Búsqueda en la Wikipedia.

--------

## Instalación

* Requiere Node.js >= 8.9

Primero instala las dependencias necesarias:

```
npm install
```

Luego, crea un archivo .env que contenga el token de tu bot (para obtener un token, [sigue estos pasos](https://github.com/Chikachi/DiscordIntegration/wiki/How-to-get-a-token-and-channel-ID-for-Discord)):
```
TOKEN=<tu token>
```

Y de último, para ejecutarlo, usa el siguiente comando:

```
 npm start
```

--------

Hecho en NodeJS con la librería [discord.io (por izy512)](https://github.com/izy521/discord.io).

El bot hace uso de la API "[Stack Exchange API](https://api.stackexchange.com/docs)" para las búsquedas en Stack Overflow. Tanto el Stack Exchange API como Stack Overflow pertenecen a Stack Exchange Inc.

*The unified mark is a trademark of the Wikimedia Foundation and is used with the permission of the Wikimedia Foundation. We are not endorsed by or affiliated with the Wikimedia Foundation.*
