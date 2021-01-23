import Typography from 'typography';

/**
 * typography va a google fonts y trae las fuentes
 * headerFontFamily para los tiutulos 
 * 
 */

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.666,
  headerFontFamily: ['Lato', 'Helvetica Neue', 'Arial'],
  bodyFontFamily: ['Open Sans', 'Roboto', 'Georgia']
});

export default typography;