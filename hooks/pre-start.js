var fs = require('fs-extra');
var jsonConcat = require('json-concat');

const localizationSourceFilesEN = [
  './i18n/general.en.json',
  'src/i18n/auth.en.json',
  './i18n/products.en.json',
  './i18n/components.en.json',
];

const localizationSourceFilesHR = [
  './i18n/general.hr.json',
  './i18n/auth.hr.json',
  './i18n/products.hr.json',
  './i18n/components.hr.json',
];

const mergeAndSaveJsonFiles = (src, dest) => {
  jsonConcat({ src: src, dest: dest }, res => {
    console.log('Localization files successfully merged!');
  });
};

const setEnvironment = (configPath, environment) => {
  fs.writeJson(configPath, { env: environment }, error => {
    if (error) {
      console.warn('The file could not be read ', error);
    }
    console.log('Environment variable set to ' + environment);
  });
};

// Set environment variable to "development"
setEnvironment('./config/env.json', 'development');

// Merge all localization files into one
mergeAndSaveJsonFiles(localizationSourceFilesEN, './src/i18n/en.json');
mergeAndSaveJsonFiles(localizationSourceFilesHR, './src/i18n/hr.json');
