# Quick Start

## UPDATE: A more clean example using the WebSocket polyfill can be found here https://github.com/hharnisc/react-native-meteor-websocket-polyfill

_If you're interested in using the React Native bridge this is still a good example_

Note this is an experiment, subject to change. Also here's a post breaking down in more detail what was done, and what is needed for a more smooth developer experience 

> [http://hharnisc.github.io/2015/04/15/react-native-and-meteor.html](Some Thoughts On Gluing React Native and Meteor)

This works with the Meteor `todos` example project.

I'm using Objective-DDP to talk to Meteor (via [DDP](http://en.wikipedia.org/wiki/Distributed_Data_Protocol)). The data is passed to the JS runtime with React Native's `eventDispatcher`.

## Install NPM Modules <https://docs.npmjs.com/getting-started/installing-node>

```
$ npm install
```

## Install Pods <https://cocoapods.org/>

```
$ pod install
```
![Screen Shot](https://raw.githubusercontent.com/hharnisc/react-native-meteor/master/ScreenShot.png)
