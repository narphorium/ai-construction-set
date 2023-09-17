import commonjs from "@rollup/plugin-commonjs";
import image from '@rollup/plugin-image';
import resolve from "@rollup/plugin-node-resolve";
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import postcssPresetEnv from 'postcss-preset-env';
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from 'rollup-plugin-postcss';

const packageJson = require("./package.json");

const input = 'src/index.ts';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

const external = [
  ...Object.keys(packageJson.devDependencies || {}),
  ...Object.keys(packageJson.peerDependencies || {}),
];

const plugins = [
  peerDepsExternal(),
  resolve({
    browser: true
  }),
  postcss({
    extensions: [ '.css' ],
    plugins: [
      postcssPresetEnv(),
    ]
  }),
  image(),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json'
  }),
  terser(),
];

export default [{
  input: input,
  output: {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
      globals: globals
    }
  ,
  plugins: plugins,
  external: external
}];