import * as resources from '@quartz/common/resources';

PluginManager.loadScript = function (name) {
  let url = this._path + name;
  url = `${location.origin}/www/${url}`;
  void resources.loadScript(url, { async: false });
};
