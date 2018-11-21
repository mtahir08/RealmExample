import React, { Component } from 'react';
import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  View
} from 'react-native';
import Swipeout from 'react-native-swipeout';

import { deleteTodoList, queryAllTodoLists } from '../database/allSchemas';
import realm from '../database/allSchemas';

import HeaderComponent from './HeaderComponent';
import PopupDialogComponent from './PopupDialogComponent';

const FlatListItem = props => {
  const {
    itemIndex,
    id,
    name,
    creationDate,
    onPressItem,
    onActionPress
  } = props;
  showModal = () => {};
  showEditModal = () => {
    onActionPress(id, name);
  };

  showDeleteConfirmation = () => {
    Alert.alert(
      'Delete',
      'Delete a Todo List',
      [
        {
          text: 'no',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'yes',
          onPress: () => deleteTodoList(id)
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <Swipeout
      right={[
        {
          text: 'Edit',
          backgroundColor: 'rgb(81, 134, 237)',
          onPress: showEditModal
        },
        {
          text: 'Delete',
          backgroundColor: 'rgb(217, 80, 64)',
          onPress: showDeleteConfirmation
        }
      ]}
      autoClose={true}
    >
      <TouchableOpacity onPress={onPressItem}>
        <View
          style={{
            backgroundColor: itemIndex % 2 == 0 ? 'powderblue' : 'skyblud'
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 18, margin: 10 }}>
            {name}
          </Text>
          <Text style={{ fontSize: 18, margin: 10 }} numberOfLines={2}>
            {creationDate ? creationDate.toLocaleString() : ''}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeout>
  );
};
class TodoListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoLists: [],
      visibleDialog: false
    };
    this.reloadData();
    realm.addListener('change', () => {
      this.reloadData();
    });
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

  toggleDialog = flag => {
    this.setState({ visibleDialog: flag });
  };
  ExtractKey = (item, index) => item.id.toString();
  render() {
    return (
      <View style={styles.container}>
        <HeaderComponent
          title={'Todo List'}
          hasAddButton={true}
          hasDeleteAllButton={this.state.todoLists.length > 0}
          showAddTodoList={() =>
            this.setState({ visibleDialog: true }, () =>
              this.refs.popupDialogComponent.showDialogComponentForAdd()
            )
          }
        />
        <FlatList
          style={styles.flatList}
          data={this.state.todoLists}
          keyExtractor={this.ExtractKey}
          renderItem={({ item, index }) => {
            return (
              <FlatListItem
                id={item.id}
                name={item.name}
                creationDate={item.creationDate}
                itemIndex={index}
                onPressItem={() => alert('You pressed')}
                onActionPress={(id, name) =>
                  this.setState({ visibleDialog: true }, () =>
                    this.refs.popupDialogComponent.showDialogComponentForUpdate(
                      { id, name }
                    )
                  )
                }
              />
            );
          }}
        />
        <PopupDialogComponent
          ref={'popupDialogComponent'}
          visibleDialog={this.state.visibleDialog}
          toggleDialog={this.toggleDialog}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  flatList: {
    flex: 1,
    flexDirection: 'column'
  }
});
export default TodoListComponent;
