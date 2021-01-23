# Platzi Store with Gatsby

+ Instalación de manera global
`$ npm install gatsby-cli -g`

Usamos gatsby-cli para generar un proyecto básico de Gatsby. 
`$ gatsby new nombredelproyecto`

Correr el proyecto
`$ gatsby develop`

+ Instalación manual npm.
`$ npm install gatsby`

+ Starters
Los starters son proyectos creados con el fin de modificar el contenido y tener nuestro sitio listo sin necesidad de hacer configuraciones. Solo debemos copiar el nombre del starter y ejecutar el siguiente comando:
`$ gatsby new tu-proyecto creador/nombre-del-starter`

### Archivos de configuaración de Gatsby

#### gatsby-config.js: 
configuramos la metadata (título, descripción y autor) y los plugins de Gatsby que usaremos para construir nuestra aplicación.

#### gatsby-browser.js: 
una parte de nuestro código se construye desde el servidor, en el build time, y otra parte muy importante en el navegador, cada vez que los usuarios entran a nuestra aplicación. En este archivo podemos utilizar algunas APIs o métodos predefinidos para configurar el código que debe ejecutarse en el navegador, por ejemplo, para añadir vistas, cargar librerías o configurar un store global para manejar el estado.

#### gatsby-node.js: 
configuramos todo lo que tiene que ver con la construcción de nuestro sitio web con Gatsby. Podemos generar vistas en función de nuestra información proveniente de GraphQL, incluso utilizando APIs externas a nuestra aplicación.

#### gatsby-ssr.js: 
configuramos lo que sucede en el build time para que nuestra aplicación funcione correctamente en producción. Tiene el mismo fin que gatsby-browser.js, solo que este será el código que enviamos a producción.
El resto de archivos y carpetas contienen código JavaScript (seguramente con React)

### Ecosistema de plugins
Los plugins son código de Gatsby que alguien más de la comunidad escribió por nosotros para que podamos configurar nuestra aplicación lo más ágil y rápido posible.

#### Los plugins pueden ayudarnos de 3 formas:

+ Plugins como Componentes: Cuando instalamos el plugin obtenemos un componente que debemos integrar a nuestra aplicación para obtener algún beneficio.

+ Plugins como Funcionalidades: Nos ayudan a transformar información o implementar una funcionalidad en concreto. Por ejemplo: gatsby-image nos ayuda a crear nuevas versiones de nuestras imágenes con menor calidad para mejorar la carga inicial de nuestro sitio web.

+ Plugins como Fuente de Datos: Estos plugins utilizan Node.js y GraphQL para consumir la información de algún lugar o herramienta como Firebase, WordPress, APIs Rest, entre otras.

wrapPageElement -> Colocar cosas como Layout y elementos UI
wrapRootElement -> Colocar providers y estilos

```javascript
// gatsby-browser.js
exports.wrapRootElement = ({ element }) => (
  <Layout>
    {element}
  </Layout>
);
```

### Queries, Edges (conexiones) y Nodos en Gatsby
Al trabajar con plugins de fuente de datos debemos entender dos conceptos:

#### Edges: 
No podemos consumir la información de estos plugins de la misma forma que otras consultas de GraphQL. En estos casos, la propiedad edges nos hace referencia a la conexión entre estos plugins y el servidor de GraphQL.

#### Nodos: 
Son los elementos individuales de información que obtenemos al hacer una consulta con la propiedad edges.
Por ejemplo: Para conseguir la información del nuestras imágenes (guardadas en la carpeta src/images) usamos el plugin <stong>gatsby-source-filesystem</stong>.

En este caso podemos acceder a la información de nuestras imágenes con la siguiente consulta de GraphQL:
```graphql
query {
  allFile {
    edges {
      node {
         name
         relativePath
      }
    }
  }
}
```
Recuerda que la ruta que obtenemos con la propiedad relativePath es relativa a la propiedad path de nuestra configuración del plugin gatsby-source-filesystem en el archivo gatsby-config.js.

Otro ejemplo: Podemos acceder a la metadata que configuramos en el archivo gatsby-config.js ejecutando la siguiente consulta en GraphQL:
```graphql
query {
  allSite {
    edges {
      node {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  }
}
```

### Consultas en GraphQL desde React

+ Debemos importar graphql desde gatsby:
```javascript
// src/pages/NuestroPage.js
import { graphql } from 'gatsby';
```

+ Exportar nuestra consulta con el nombre de query:
```javascript
// src/pages/NuestroPage.js
export const query = graphql`
  query NUESTRA_CONSULTA {
    # ...
  }
`;
```

+ Y consumir la información de la propiedad data que obtenemos automáticamente en el componente de nuestra página:
```javascript
/ src/pages/NuestroPage.js
export default function NuestroPage({ data }) {
  console.log(data.allSite.edges[0].node.siteMetadata);

  return /* ... */;
}
```

*** Recuerda que solo podemos hacer estas consultas en los componentes página de nuestra aplicación, es decir, solo desde los archivos dentro de src/pages/.

### Plugins de transformación

#### gatsby-transformer-sharp
Se encarga de crear nuevas versiones de nuestras imágenes con diferentes tamaños, formatos (.webp, .png, entre otros) y calidad.

+ Consulta varias imagenes
```graphql
{
  allFile {
    edges {
      node{
				childImageSharp{
					fluid(maxWidth: 500){
						src
            srcWebp
            sizes
            originalImg
            base64
          }
        }
      }
    }
  }
}
```
+ Consulta una imagen
```graphql
query{
	logo: file(relativePath: {eq:"Logo.png"}){
		childImageSharp{
			fluid(maxWidth: 1000){
				src
        srcWebp
      }
    }
  }
}
```

#### gatsby-image:
Utiliza la información de gatsby-transformer-sharp para cargar las versiones más livianas de nuestras imágenes (utilizando el tamaño y formato que mejor se adapten al usuario) y luego cambiarlas por las versiones actualizadas de mejor calidad, todo esto con el fin de mejorar el tiempo de carga inicial de nuestra aplicación.

Para usarlo solo debemos seguir los siguientes pasos:

import {graphql, StaticQuery} from 'gatsby';

StaticQuery -> es un componente de render props que recibe dos props:
Debemos usar el componente StaticQuery para hacer consultas en GraphQL desde cualquier archivo o componentes que no este en la carpeta src/pages.

```graphql
<StaticQuery 
  query={graphql`
    query GET_IMAGE{
      icon: file(relativePath: {eq: "icon.png"}){
        childImageSharp{
          fluid(maxWidth:1000){
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `}
  render={data => <Img fluid={data[name].childImageSharp.fluid} />}
/>
```

### Stripe 
Para usar Stripe desde nuestra aplicación con gatsby necesitamos instalar los siguientes plugins:

`$ npm i gatsby-source-stripe gatsby-plugin-stripe`

Luego de esto debemos añadir los plugins al archivo gatsby-config.js:

#### gatsby-config.js
```javascript

module.exports = {
  siteMetadata: { /* ... */ },
  plugins: [
    /* ... */
    `gatsby-plugin-stripe`,
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: [`Sku`],
        secretKey: process.env.STRIPE_SK,
      },
    }
    /* ... */
  ],
};
```
Query de stripe
```graphql
query {
  allStripeSku {
    edges {
      node {
        id
        price
        product {
          name
          metadata {
            description
            wear
            img
          }
        }
      }
    }
  }
}
```

### Creando páginas en función de los datos  (Páginas dinámicas)
El método createPages de gatsby-node.js nos ayuda a crear páginas sin necesidad de crear un archivo por cada una de ellas en la carpeta src/pages.

En este caso, vamos a generar una página por cada uno de los productos que guardamos en Stripe:

// gatsby-node.js
```javascript
const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const productTemplate = path.resolve(`src/templates/Product.js`);
  const result = await graphql(`
    query GET_SKUS {
      allStripeSku {
        edges {
          node {
            id
            price
            product {
              name
              metadata {
                description
                img
                wear
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  result.data.allStripeSku.edges.forEach(({ node }) => {
    createPage({
      path: `${node.id}`,
      component: productTemplate,
    });
  });
}
```