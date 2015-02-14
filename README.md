Pancakes Sample App
=====================

The purpose of this project is to show how you can use Pancakes outside of GetHuman.
This is a work in progress and is not quite ready yet.

## Installation

* Add the following entires to your hosts file:

127.0.0.1	     api.dev.foo.com
127.0.0.1        dev.foo.com
127.0.0.1        assets.dev.foo.com

* Install homebrew
* Run the following commands from the project root dir (skip anything already installed)

brew update
brew install node
brew install git
brew install mongodb
sudo npm install -g gulp
npm install
gulp devrefresh

* Start Mongo
mongod

* now you can run the web and api by running the following in two separate consoles:

node start api
node start web

* verify they are up by going to:

http://api.dev.foo.com/ping
http://dev.foo.com/ping

* Now visit the foo home page. Make sure there are no errors in the JavaScript console.

http://dev.foo.com

## Convenience ToDos

If you copy this project and start customizing it, a couple tips:

1. Install supervisor and use that to run your web and api so that it will reload automatically when file changes are made
1. Run gulp.watch as you code so that the client side files are automatically rebuilt
