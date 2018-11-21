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
  queryAllTodoLists
} from '../database/allSchemas';

import realm from '../database/allSchemas';
import HeaderComponent from './HeaderComponent';
import PopupDialogComponent from './PopupDialogComponent';

class TodoListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoLists: []
    };
  }

  reloadData = () => {
    queryAllTodoLists()
      .then(todoLists => {
        this.setState({ todoLists });
      })
      .catch(error => {
        console.log(error);
        this.setState({ todoLists: [] });
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <HeaderComponent
          title={'Todo List'}
          hasAddButton={true}
          showAddTodoList={() =>
            this.refs.popupDialogComponent.showDialogComponentForAdd()
          }
        />
        <FlatList
          style={styles.flatList}
          data={this.state.todoLists}
          renderItem={(item, index) => {
            <FlatListItem
              {...item}
              itemIndex={index}
              popupDialogComponent={this.refs.popupDialogComponent}
              onPress={() => alert('You pressed')}
              keyExtractor={item => item.id}
            />;
          }}
        />
        <PopupDialogComponent ref={'popupDialogComponent'} />
      </View>
    );
  }
}

export default TodoListComponent;
