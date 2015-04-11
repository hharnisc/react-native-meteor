/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var _ = require('lodash');
var Immutable = require('immutable');
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
var DDPClient = require('NativeModules').DDPClient;

var AwesomeProject = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => !_.isEqual(row1, row2),
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    DDPClient.connectWithURL('ws://localhost:3000/websocket');
    DDPClient.subscribe('publicLists');

    var currentRows = Immutable.List.of();
    var that = this;

    var addedObserver = RCTDeviceEventEmitter.addListener('added', function(data) {
      currentRows = currentRows.push(data);
      that.updateRows(currentRows.toArray());
    });

    var changedObserver = RCTDeviceEventEmitter.addListener('changed', function(data) {
      currentRows = currentRows.map(function(row){
        if (row._id === data._id) {
          return data
        } else {
          return row
        }
      });
      that.updateRows(currentRows.toArray());
    });

    var removedObserver = RCTDeviceEventEmitter.addListener('removed', function(data) {
      currentRows = currentRows.filter(function(row) {
        return row._id !== data._id
      })
      that.updateRows(currentRows.toArray());
    });
  },

  updateRows: function(rows) {
    this.setState({
     dataSource: this.state.dataSource.cloneWithRows(rows),
     loaded: true,
   });
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderList}
        style={styles.listView}
      />
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading lists...
        </Text>
      </View>
    );
  },

  renderList: function(list) {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>{list.name}</Text>
        <Text style={styles.incompleteCount}>{list.incompleteCount}</Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
  },
  name: {
    flex: 5,
    fontSize: 18,
  },
  incompleteCount: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    color: '#2196F3',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
