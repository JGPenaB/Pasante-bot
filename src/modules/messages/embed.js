/**
 * Le indica al usuario cómo debe usar el comando
 *
 * @param { string } recommendation Qué debe hacer el usuario para usar bien el comando
 * @param { string } commandUsage Cómo debe usar correctamente el comando
 *
 * @return { Object }
 */
const generateEmbed = (recommendation, commandUsage) => ({
  color: 5396735,
  fields: [
    {
      name: 'Querido usuario',
      value: `Lamento informarle que aparte de que bayke tiene trabajo, usted debe ${recommendation}`
    },
    {
      name: 'Uso',
      value: commandUsage
    }
  ],
  image: {
    url:
      'https://www.bkconnection.com/system/refinery/blog/posts/thumbnails/000/003/323/post_detail/family-friendly-app-store.gif?1432824720'
  }
});

module.exports = generateEmbed;
