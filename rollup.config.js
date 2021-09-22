import resolve from "rollup-plugin-node-resolve"
import babel from "rollup-plugin-babel"
import commonjs from "rollup-plugin-commonjs"
import generatePackageJson from "rollup-plugin-generate-package-json"
import svgr from "@svgr/rollup"
import url from "rollup-plugin-url"
import alias from "@rollup/plugin-alias"
import path from 'path'


export default {
  input: "src/index.jsx",
  output: {
    file: "dist/bundles/bundle.js",
    format: "esm",
  },
  external: ["react", "react-dom", "styled-components"],
  plugins: [
    resolve({ extensions: [".jsx", ".js", ".tsx"] }),
    commonjs(),
    url(),
    svgr(),
    alias(
      {
         '@src': path.resolve(__dirname, 'src/*'),
      }
  ),
    babel({
      extensions: [".jsx", ".js", ".tsx"],
      exclude: "node_modules/**",
    }),
    generatePackageJson({
      outputFolder: "dist",
      baseContents: (pkg) => ({
        name: pkg.name,
        main: "bundles/bundle.js",
        peerDependencies: {
          react: "^16.13.1",
        },
      }),
    }),
  ],
}
