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
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Book App</title>
        </head>
        <body>
          <div id="root"></div>
          <script src="bundle.js"></script>
        </body>
        </html>
      `
    })
  ]
};
