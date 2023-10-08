import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])

  // Render all todos
  useEffect(() => {
    axios.get('https://todos-api-sh19.onrender.com/todos')
      .then(response => setTodos(response.data))
  }, [])

  // Delete todo
  function deleteTodo(id) {
    axios.delete(`https://todos-api-sh19.onrender.com/todos/${id}`)
      .then(response => console.log(response))
    const updatedTodos = todos.filter(todo => todo._id !== id)
    setTodos(updatedTodos)
  }

  // Create todo
  function createTodo() {
    const titleInput = document.getElementById('title')
    const descriptionInput = document.getElementById('description')
    axios.post('https://todos-api-sh19.onrender.com/todos', { title: titleInput.value, description: descriptionInput.value })
      .then(response => {
        const updatedTodos = [...todos, { _id: response.data.id, title: titleInput.value, description: descriptionInput.value }]
        setTodos(updatedTodos)
        titleInput.value = ''
        descriptionInput.value = ''
      })
  }

  return (
    <div>
      <div className='centered-text'>
        <h1>Todo List</h1>
        <input id='title' type="text" placeholder='Title' /> &nbsp;
        <input id='description' type="text" placeholder='Description' /> &nbsp;
        <button onClick={createTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => <Todo key={todo._id} todo={todo} onDelete={deleteTodo}></Todo>)}
      </ul>
    </div>
  )
}

function Todo(props) {
  return (
    <li type='square'>
      <h3>{props.todo.title}</h3>
      <p>{props.todo.description}</p>
      <button id={props.todo._id} onClick={() => props.onDelete(props.todo._id)}>Delete</button>
    </li>
  )
}

export default App
