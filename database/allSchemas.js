import Realm from 'realm';
export const TODOLIST_SCHEMA = 'TodoList';
export const TODO_SCHEMA = 'Todo';
// Define Models and properties
export const TodoSchema = {
  name: TODO_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: { type: 'string', indexed: true },
    bool: { type: 'bool', default: false }
  }
};

export const TodoListSchema = {
  name: TODOLIST_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    creationDate: 'date',
    todo: { type: 'list', objectType: TODO_SCHEMA }
  }
};
const databaseOptions = {
  path: 'TodoListApp.realm',
  schema: [TodoListSchema, TodoSchema],
  schemaVersion: 0 //optional
};
// functions for TodoList
export const insertNewTodoList = newTodoList =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(data => {
          realm.create(TODOLIST_SCHEMA, newTodoList);
          resolve(newTodoList);
        });
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });

export const updateTodoList = todoList =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(data => {
          let updatingTodoList = realm.objectForPrimaryKey(
            TODOLIST_SCHEMA,
            todoList.id
          );
          updatingTodoList.name = todoList.name;
          resolve();
        });
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });

export const deleteTodoList = todoListId =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(data => {
          let deletingTodoList = realm.objectForPrimaryKey(
            TODOLIST_SCHEMA,
            todoListId
          );
          realm.delete(deletingTodoList);
          resolve();
        });
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });

export const deleteAllTodoList = todoListId =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(data => {
          let allTodoLists = realm.objects(TODOLIST_SCHEMA);
          resolve(allTodoLists);
        });
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });

export const queryAllTodoLists = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        let allTodoLists = realm.objects(TODOLIST_SCHEMA);
        resolve(allTodoLists);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });

const realm = new Realm(databaseOptions);
export default realm;
