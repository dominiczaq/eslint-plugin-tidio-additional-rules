const tidioModules = [
  'store',
  'apiData',
  'swal',
  'helpers',
  'design',
  'utils',
  'track',
  'lang',
  'chatData',
  'botsSectionHelpers',
  'upgradeHelpers'
];

const isNodeTidioModule = nodeValue => {
  let tidioModule = false;
  for (let i = 0; i < tidioModules.length; i += 1) {
    if (nodeValue.startsWith(tidioModules[i])) {
      tidioModule = true;
    }
  }
  return tidioModule;
};

module.exports = {
  isNodeTidioModule
};
