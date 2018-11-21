import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput
} from 'react-native';

import Dialog, { DialogTitle, SlideAnimation } from 'react-native-popup-dialog';
import { insertNewTodoList, updateTodoList } from '../database/allSchemas';

class PopupDialogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: '',
      isAddNew: true
    };
  }

  showDialogComponentForUpdate = param => {
    this.setState({
      dialogTitle: 'Update TodoList',
      name: param.name,
      isAddNew: false,
      id: param.id
    });
  };
  showDialogComponentForAdd = () => {
    this.setState({
      dialogTitle: 'Add New TodoList',
      name: '',
      isAddNew: true
    });
  };

  onSaveButtonPress = () => {
    if (this.state.name.trim() == '') {
      alert("Please Enter todoList' name");
      return;
    }
    if (this.state.isAddNew == true) {
      const NewTodoList = {
        id: Math.floor(Date.now() / 1000),
        name: this.state.name,
        creationDate: new Date()
      };
      insertNewTodoList(NewTodoList)
        .then()
        .catch(error => {
          alert(`Insert new todoList error ${error}`);
        });
    } else {
      const obj = {
        id: this.state.id,
        name: this.state.name
      };
      updateTodoList(obj)
        .then()
        .catch(error => {
          alert(`Insert new todoList error ${error}`);
        });
    }
    this.props.toggleDialog(false);
  };
  render() {
    const { dialogTitle } = this.state;
    return (
      <Dialog
        dialogTitle={<DialogTitle title={dialogTitle} />}
        width={0.7}
        height={180}
        ref={'popupDialog'}
        visible={this.props.visibleDialog}
      >
        <View style={styles.container}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Todo List"
            autoCorrect={false}
            onChangeText={text => this.setState({ name: text })}
            value={this.state.name}
          />
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.onSaveButtonPress}
            >
              <Text style={styles.textLabel}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.toggleDialog(false)}
            >
              <Text style={styles.textLabel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog>
    );
  }
}

export default PopupDialogComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  TextInput: {
    height: 40,
    padding: 10,
    margin: 10,
    borderColor: 'gray',
    borderWidth: 1
  },
  button: {
    backgroundColor: 'steelblue',
    padding: 10,
    margin: 10
  },
  textLabel: {
    color: 'white',
    fontSize: 18
  }
});
