#!/bin/sh

rm -rf release && mkdir release;
npm run build;
cp ./{scrollspy.js,README.md,package.json,gulpfile.js,.eslintrc} ./release/

rm -rf *.tar.gz
rm -rf *.zip
tar -zcvf react-scrollspy.tar.gz ./release
zip -r react-scrollspy.zip ./release
