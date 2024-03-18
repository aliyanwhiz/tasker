import React, { useState } from 'react'
import './App.css'
import InputField from './components/InputField'
import { Todo } from './Todo'
import TodoList from './components/todoList'

const App:React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])
  const handleAdd = (e:React.FormEvent) => {
    e.preventDefault()
    if (todo) {
      setTodos([...todos, {id:Date.now(),task: todo, isDone:false}])
    }
    setTodo("");
  }
  console.log(todos);
  
  return (
    <div className="app">
      <span className="heading">
        Tasker
      </span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  )
}

export default App