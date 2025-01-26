import commonjs from "@rollup/plugin-commonjs";
import image from "@rollup/plugin-image";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import postcssPresetEnv from "postcss-preset-env";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

const packageJson = require("./package.json");

const input = "src/index.ts";

const globals = {
  react: "React",
  "react-dom": "ReactDOM",
};

const external = [
  ...Object.keys(packageJson.devDependencies || {}),
  ...Object.keys(packageJson.peerDependencies || {}),
];

const typeDeclarationPlugin = typescript({
  tsconfig: "./tsconfig.json",
  declaration: true,
  declarationDir: "./dist/types",
  emitDeclarationOnly: true,
  outDir: undefined,
  outputToFilesystem: true,
});

const tsPlugin = typescript({
  tsconfig: "./tsconfig.build.json",
  outDir: "./dist",
});

const plugins = [
  peerDepsExternal(),
  resolve({
    browser: true,
  }),
  postcss({
    extensions: [".css"],
    plugins: [postcssPresetEnv()],
  }),
  image(),
  commonjs(),
  tsPlugin,
  terser(),
];

const createConfigRoot = (input, output) => ({
  input,
  output: [
    { file: output.cjs, format: "cjs", sourcemap: "inline", globals: globals },
    { file: output.esm, format: "esm", sourcemap: "inline", globals: globals },
  ],
  plugins: [...plugins, typeDeclarationPlugin],
  external: external,
});

const createConfig = (input, output) => ({
  input,
  output: [
    { file: output.cjs, format: "cjs", sourcemap: "inline", globals: globals },
    { file: output.esm, format: "esm", sourcemap: "inline", globals: globals },
  ],
  plugins: plugins,
  external: external,
});

export default [
  createConfigRoot(input, {
    cjs: packageJson.main,
    esm: packageJson.module,
  }),
  createConfig("src/components/index.ts", {
    cjs: "dist/components/index.js",
    esm: "dist/components/index.mjs",
  }),
  createConfig("src/context/index.ts", {
    cjs: "dist/context/index.js",
    esm: "dist/context/index.mjs",
  }),
  createConfig("src/hooks/index.ts", {
    cjs: "dist/hooks/index.js",
    esm: "dist/hooks/index.mjs",
  }),
  createConfig("src/selectors/index.ts", {
    cjs: "dist/selectors/index.js",
    esm: "dist/selectors/index.mjs",
  }),
  createConfig("src/styles/index.ts", {
    cjs: "dist/styles/index.js",
    esm: "dist/styles/index.mjs",
  }),
  createConfig("src/transformations/index.ts", {
    cjs: "dist/transformations/index.js",
    esm: "dist/transformations/index.mjs",
  }),
];
