import typescript from "@rollup/plugin-typescript"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import { RollupOptions } from "rollup"

const options: RollupOptions = {
    input: "src/main.ts",
    output: {
        dir: ".",
        sourcemap: "inline",
        format: "cjs",
        exports: "default",
    },
    external: ["obsidian"],
    plugins: [typescript(), nodeResolve({ browser: true }), commonjs()],
}

export default options
