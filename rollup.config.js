import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';

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
    copy({
      targets: [
        { src: 'index.html', dest: 'dist' } // Копируем index.html в dist
      ]
    })
  ]
};
