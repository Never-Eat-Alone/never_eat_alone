xcode_version=$(which xcode-select)
if [[ xcode_version == '' ]]
then
  sudo rm -r -f $(xcode-select --print-path)
  xcode-select --install
fi
postgres_version=$(which postgres)
if [[ postgres_version == '' ]]
then
  brew install postgresql
fi
brew services start postgresql
createdb neatest
psql
createuser testuser
