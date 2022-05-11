#!/bin/bash
if [ "$1" = "" ]; then
  echo "Project name missing."
  exit
fi
if [ "$2" = "" ]; then
  echo "Description missing."
  exit
fi
if [ -d "$1" ]; then
  echo "Project already exists."
  exit
fi
mkdir "$1"
pushd "$1"
mkdir source
pushd source
cp ../../scratch/source/index.html .
cp ../../scratch/source/index.tsx .
popd
cp ../scratch/build.bat .
cp ../scratch/build.sh .
cp ../scratch/configure.bat .
cp ../scratch/configure.sh .
cp ../scratch/package.json .
cp ../scratch/tsconfig.json .
cp ../scratch/webpack.config.js .
sed -i "s/\"scratch\"/\"$1\"/" package.json
sed -i "s/\"Dummy project for experimenting with web components.\"/\"$2\"/" \
  package.json
grep -q "CALL:build $1" ../build.bat
if [ "$?" != "0" ]; then
  sed -i "/CALL:build/a CALL:build $1 %*" ../build.bat
fi
grep -q "targets+=\" $1\"" ../build.sh
if [ "$?" != "0" ]; then
  sed -i "/targets+=\" scratch\"/a targets+=\" $1\"" ../build.sh
fi
grep -q "CALL:configure $1" ../configure.bat
if [ "$?" != "0" ]; then
  sed -i "/CALL:configure/a CALL:configure $1 %*" ../configure.bat
fi
grep -q "projects+=\" $1\"" ../configure.sh
if [ "$?" != "0" ]; then
  sed -i "/projects+=\" scratch\"/a projects+=\" $1\"" ../configure.sh
fi
chmod +x build.bat build.sh configure.bat configure.sh
git add build.bat build.sh configure.bat configure.sh package.json \
  tsconfig.json webpack.config.js source/index.tsx source/index.html
