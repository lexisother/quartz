import * as resources from '@quartz/common/resources';
import * as path from 'path';
import * as fs from 'fs';

export async function buildNecessaryDOM(): Promise<void> {
  const indexSource = fs.readFileSync(path.join('www', 'index.html'), 'utf8');
  const index = new DOMParser().parseFromString(indexSource, 'text/html');

  const base = index.createElement('base');
  base.href = '/www/';
  document.head.insertBefore(base, document.head.firstChild)
  index.head.insertBefore(base, index.head.firstChild);

  let scripts = index.querySelectorAll<HTMLScriptElement>('body > script');

  await Promise.all([
    ...Array.from(scripts).map((script) => {
      let prom = resources.loadScript(script.src, { async: false });
      if (script.src.includes('plugins')) {
        void resources.loadScript(`${location.origin}/quartz/dist/patchManager.js`, {
          async: true,
        });
      }
      return prom;
    }),
  ]);

  process.mainModule.filename = require('path').join(
    process.mainModule.filename,
    '..',
    '..',
    'www',
    'index.html',
  );

  // for (let script of scripts) {
  //   if (script.src.includes('main')) {
  //     console.log('Plugins', fs.readdirSync('./www/js/plugins'));
  //     PluginManager.loadScript = function (name) {
  //       let url = this._path + name;
  //       resources.loadScript(url, { async: false });
  //     };
  //   } else {
  //     resources.loadScript(script.src, { async: false });
  //   }
  // }
}

export async function loadMainScript(): Promise<void> {}
