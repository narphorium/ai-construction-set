import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const packageJson = require("./package.json");

const input = 'src/index.ts';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

// const external = [/node_modules/];
const external = [
  ...Object.keys(packageJson.devDependencies || {}),
  ...Object.keys(packageJson.peerDependencies || {}),
];

// const external = ['react'];

const plugins = [
  peerDepsExternal(),
  resolve({
    browser: true
  }),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json'
  })
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
},{
  input: input,
  output: {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
      globals: globals
    }
  ,
  plugins: plugins,
  external: external
}];