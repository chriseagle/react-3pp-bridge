import * as esbuild from 'esbuild';

const args = process.argv.slice(2);
const isWatchMode = args.includes('--watch');

const buildOptions = {
  entryPoints: ['src/index.ts'],
  outdir: 'dist',
  bundle: true,
  sourcemap: true,
  minify: true,
  splitting: true,
  format: 'esm',
  target: ['esnext'],
  external: ['react'],
};

const build = async () => {
  if (isWatchMode) {
    esbuild
      .build({
        ...buildOptions,
        watch: {
          onRebuild(error, result) {
            if (error) {
              console.error('Watch build failed:', error);
            } else {
              console.log('Watch build succeeded:', result);
            }
          },
        },
      })
      .then(() => {
        console.log('Watching for changes...');
      })
      .catch(() => process.exit(1));
  } else {
    esbuild
      .build(buildOptions)
      .then((result) => {
        console.log('Build succeeded:', result);
      })
      .catch(() => process.exit(1));
  }
};

build();
