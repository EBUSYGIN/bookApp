import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/app.js',
  output: {
    dir: 'dist',
    format: 'esm'
  },
  plugins: [
    nodeResolve(),
    postcss({
      modules: true
    })
  ]
};
