import * as esbuild from 'esbuild';
import path from 'path';
import fs from 'fs';

async function build(name, entry) {
  const outfile = path.join('./dist', name + '.js');

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

Promise.all([build('core', 'packages/core/src/main.ts')]);
