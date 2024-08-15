import * as esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    outdir: "dist",
    bundle: true,
    sourcemap: true,
    minify: true,
    splitting: true,
    format: "esm",
    target: ["esnext"],
    external: ["react"],
  })
  .catch(() => process.exit(1));
