import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';
// Use this if contains any css import
// import postcss from 'rollup-plugin-postcss'

const input = './src/index.ts';

export default [
  {
    input,
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
      },
      {
        file: 'dist/index.es.js',
        format: 'es',
      },
    ],
    plugins: [
      typescript(),
      external(),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
      }),
      json(),
      resolve(),
      commonjs(),
    ],
  },
];
