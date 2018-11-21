import React, { Component } from 'react';
import {
  Alert,
  TouchableOpacity,
  StyleSheet,
  View,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { deleteAllTodoList } from '../database/allSchemas';

const confirmDeleteAll = () => {
  Alert.alert(
    'Delete',
    'Do you want to delete all?',
    [
      {
        text: 'no',
        onPress: () => {},
        style: 'cancel'
      },
      {
        text: 'yes',
        onPress: () => deleteAllTodoList()
      }
    ],
    { cancelable: true }
  );
};

const HeaderComponent = props => {
  const {
    title,
    showAddTodoList,
    hasAddButton,
    hasSortButton,
    sort,
    sortState,
    hasDeleteAllButton
  } = props;
  return (
    <View style={styles.container}>
      {hasAddButton && (
        <TouchableOpacity style={styles.addButton} onPress={showAddTodoList}>
          <Icon name="plus-circle" size={30} color="#fff" />
        </TouchableOpacity>
      )}
      {hasDeleteAllButton && (
        <TouchableOpacity style={styles.addButton} onPress={confirmDeleteAll}>
          <Icon name="trash" size={30} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgb(224, 93, 144)',
    height: Platform.OS == 'ios' ? 100 : 80
  },
  addButton: {
    zIndex: 2,
    marginRight: 10,
    marginTop: 30
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    position: 'absolute',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    padding: 50
  }
});
export default HeaderComponent;
