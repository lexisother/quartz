import * as resources from '@quartz/common/resources';
import * as modloader from './modloader';

async function main(): Promise<void> {
  let onloadPromise = new Promise<void>((resolve) => {
    window.addEventListener('load', () => resolve());
  });

  await onloadPromise;
  await modloader.boot();
}

main().catch((err) => {
  console.error(err);
});
