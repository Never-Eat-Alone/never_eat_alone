#!/bin/sh
brew_version=$(which brew)
if [[ $brew_version == '' ]]
then
  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/\
install/master/install)"
fi
brew update
wget_version=$(which wget)
if [[ $wget_version == '' ]]
then
  brew install wget
fi
node_version=$(which node)
if [[ $brew_version == '' ]]
then
  curl "https://nodejs.org/dist/latest/node-\
${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE \
's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" \
&& sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
fi
