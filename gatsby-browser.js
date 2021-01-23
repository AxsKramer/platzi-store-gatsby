/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// Ejecuta en el cliente
// Generar vistas o un store (context o redux) o librerias

const React = require("react")
const Layout = require("./src/components/layout").default
const { GlobalStyles } = require("./src/styles")
const { CartProvider } = require("./src/context")

exports.wrapPageElement = ({ element }) => (
  <CartProvider>
    <GlobalStyles />
    <Layout>{element}</Layout>
  </CartProvider>
)
