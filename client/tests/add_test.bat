@ECHO OFF
SETLOCAL EnableDelayedExpansion
SET ROOT=%cd%
IF "%~1" == "" (
  ECHO "Project name missing."
  EXIT /B 0
)
IF "%~2" == "" (
  ECHO "Description missing."
  EXIT /B 0
)
IF EXIST "%~1" (
  ECHO "Project already exists."
  EXIT /B 0
)
MKDIR %~1
PUSHD %~1
MKDIR source
PUSHD source
CP ..\..\scratch\source\index.html .
CP ..\..\scratch\source\index.tsx .
POPD
CP ..\scratch\build.bat .
CP ..\scratch\build.sh .
CP ..\scratch\configure.bat .
CP ..\scratch\configure.sh .
CP ..\scratch\package.json .
CP ..\scratch\tsconfig.json .
CP ..\scratch\webpack.config.js .
sed -i "s/\"scratch\"/\"%~1\"/" package.json
sed -i "s/\"Dummy project for experimenting with web components.\"/\"%~2\"/" ^
  package.json
grep -q "CALL:build %~1" ..\build.bat
IF !ERRORLEVEL! NEQ 0 (
  sed -i "/CALL:build/a CALL:build %~1 %%*" ..\build.bat
)
grep -q "targets+=\" %~1\"" ..\build.sh
IF !ERRORLEVEL! NEQ 0 (
  sed -i "/targets+=\" scratch\"/a targets+=\" %~1\"" ..\build.sh
)
grep -q "CALL:configure %~1" ..\configure.bat
IF !ERRORLEVEL! NEQ 0 (
  sed -i "/CALL:configure/a CALL:configure %~1 %%*" ..\configure.bat
)
grep -q "projects+=\" %~1\"" ..\configure.sh
IF !ERRORLEVEL! NEQ 0 (
  sed -i "/projects+=\" scratch\"/a projects+=\" %~1\"" ..\configure.sh
)
git add build.bat build.sh configure.bat configure.sh package.json ^
  tsconfig.json webpack.config.js source\index.tsx source\index.html
git add --chmod=+x -- build.bat build.sh configure.bat configure.sh
POPD
ENDLOCAL
