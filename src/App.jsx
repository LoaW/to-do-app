/*
The component is using the "useState" hook to manage the state of an array of "todos". 
The "useEffect" hook is used to fetch the todos data from a Firestore collection called "todos" and set the state with the data. 
The useEffect function also returns an unsubscribe function to stop the listener when the component is unmounted.

The component also has three functions that are used to handle editing, completing and deleting of todos. 
These functions are using Firestore's updateDoc, doc and deleteDoc functions to make the corresponding changes to the Firestore collection.

The component renders a Title component, an AddToDo component, and a list of ToDo components. 
The list of ToDo components is created by mapping over the todos array and passing the todo object, 
along with the three functions as props to the ToDo component. 
*/

import './App.css';
import { useState, useEffect } from 'react'
import Title from './components/title'
import AddToDo from './components/addToDo';
import ToDo from './components/toDo';
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore" //import Firestore related functions
import { db } from './firebase'

function App() {
  const [todos, setTodos] = useState([]) // useState hook to manage the state of an array of todos

  useEffect(() => {
    const q = query(collection(db, "todos")) // create a query for the "todos" collection
    const unsub = onSnapshot(q, (querySnapshot) => { // listen for changes in the collection
      let todosArray = [];
      querySnapshot.forEach((doc) => { // iterate over the documents
        todosArray.push({ ...doc.data(), id: doc.id }) // push the data and id of each document to the array
      })
      setTodos(todosArray) // set the state with the array of todos
    })
    return () => unsub(); // return an unsubscribe function to stop the listener when the component is unmounted
  }, [])

  // function to handle editing of todos
  const handleEdit = async (todo, title) => {
    await updateDoc(doc(db, "todos", todo.id), { title: title }) // update the title of the document
  }

  // function to handle toggling the completion of todos
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.competed // toggle the completion status of the document
    })
  }

  // function to handle deleting of todos
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id)) // delete the document with the specified id
  }

  return (
    <div className="App">
      <div>
        <Title />
      </div>
      <div>
        <AddToDo />
      </div>
      <div className='todo_container'>
        {todos.map((todo) => (
          <ToDo
            // set the key prop as the id of the todo
            key={todo.id}
            // pass the todo object as a prop
            todo={todo}
            // pass the toggleComplete function as a prop
            toggleComplete={toggleComplete}
            // pass the handleDelete function as a prop
            handleDelete={handleDelete}
            // pass the handleEdit function as a prop
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
