import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
  input: {
    SearchWrapper: 'src/components/DataTable.tsx',
    BodyWrapper: 'src/components/BodyWrapper.tsx',
    PageWrapper: 'src/components/PageWrapper.tsx',
    SearchWrapper: 'src/components/SearchWrapper.tsx',
  },

  output: {
    dir: 'dist',
    format: 'esm',
  },

  plugins: [typescript(), resolve(), commonjs(), json()],
  external: ['react', 'react-dom', 'prop-types'],
};
