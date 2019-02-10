var fs = require('fs-extra');

const foldersToCopy = [
  { src: './config', dest: './dist/config' },
  { src: './i18n', dest: './dist/i18n' },
];

// copies directory, even if it has subdirectories or files
const copyDir = (src, dest) => {
  fs.copy(src, dest, error => {
    if (error) {
      console.warn('Could not copy performed ', error);
    }
    console.log(src + ' folder successfully copied');
  });
};

for (var i = foldersToCopy.length - 1; i >= 0; i--) {
  copyDir(foldersToCopy[i].src, foldersToCopy[i].dest);
}
