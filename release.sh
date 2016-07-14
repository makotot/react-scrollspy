#!/bin/sh

rm -rf release && mkdir release;
npm run build;
cp scrollspy.js README.md package.json gulpfile.js .eslintrc ./release

rm -rf react-scrollspy.tar.gz
rm -rf react-scrollspy.zip
tar -zcvf react-scrollspy.tar.gz ./release
zip -r react-scrollspy.zip ./release
