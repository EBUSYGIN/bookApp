import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import html from '@rollup/plugin-html';

export default {
  input: 'src/app.js',
  output: {
    dir: 'dist',
    format: 'iife'
  },
  plugins: [
    nodeResolve(),
    postcss({
      modules: true
    }),
    html({
      template: () => `
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="./app.js" type="module"></script>
    <link rel="stylesheet" href="./bundle.css" />
    
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

      `
    })
  ]
};
