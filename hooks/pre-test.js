import fs from 'fs-extra';

const setEnvironment = (configPath, environment) => {
  fs.writeJson(configPath, { env: environment }, error => {
    if (error) {
      console.warn('The file could not be read ', error);
    }
    console.log('Environment variable set to ' + environment);
  });
};

// Set environment variable to "test"
setEnvironment('./config/env.json', 'test');
