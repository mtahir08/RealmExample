import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

import {
  updateTodoList,
  deleteTodoList,
//   queryAllTodoLists
} from '../database/allSchemas';

// import realm from '../database/allSchemas';

class TodoListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <View />;
  }
}

export default TodoListComponent;
