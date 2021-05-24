import babel from "@rollup/plugin-babel"
import resolve from "@rollup/plugin-node-resolve"
import external from "rollup-plugin-peer-deps-external"
import {terser} from "rollup-plugin-terser"
import postcss from "rollup-plugin-postcss"
import pkg from "./package.json"

export default [
  {
    input: "./src/index.js",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
      },
      {
        file: "dist/index.es.js",
        format: "es",
        exports: "named",
      },
    ],
    plugins: [
      postcss({
        plugins: [],
        minimize: true,
        use: ["sass"],
      }),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-react"],
        babelHelpers: "bundled",
      }),
      external(),
      resolve(),
      terser({mangle: {reserved: ["React"]}}),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
  },
]
