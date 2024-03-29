import * as esbuild from 'esbuild';
import path from 'path';

const config = {
  core: 'packages/core/src/main.ts',
  patchManager: 'packages/patchManager/src/index.ts',
};

async function build(name, entry) {
  const outfile = path.join('./dist', `${name}.js`);

  /** @type {import("esbuild").BuildOptions} */
  const esbuildConfig = {
    entryPoints: [entry],
    outfile,

    format: 'cjs',
    platform: 'node',

    treeShaking: true,
    bundle: true,
    minify: true,
    sourcemap: 'inline',
  };

  await esbuild.build(esbuildConfig);
}

const promises = [];
for (const [name, path] of Object.entries(config)) {
  promises.push(build(name, path));
}
Promise.all(promises);
