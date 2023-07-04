import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';

const input = './src/export.ts';

export default {
  input,

  output: {
    dir: 'dist',
    format: 'esm',
  },

  plugins: [
    typescript(),
    resolve(),
    commonjs(),
    json(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'this && this.__assign': 'Object.assign',
      'this.__rest': 'Object.assign',
      preventAssignment: true,
    }),
  ],
  onwarn: (warning, handler) => {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versions
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }

    // console.warn everything else
    handler(warning);
  },

  external: ['react', 'react-dom', 'prop-types'],
};
