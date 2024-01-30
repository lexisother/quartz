import * as game from './game';

export async function boot(): Promise<void> {
  window.modloader = {
    name: 'quartz',
  };

  await game.buildNecessaryDOM();
}
