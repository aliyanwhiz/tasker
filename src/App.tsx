import React, { useState } from 'react'
import './App.css'
import InputField from './components/InputField'
import { Todo } from './Todo'
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TodoList from './components/todoList'

const App:React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodo, setCompletedTodo] = useState<Todo[]>([])
  const handleAdd = (e:React.FormEvent) => {
    e.preventDefault()
    if (todo) {
      setTodos([...todos, {id:Date.now(),task: todo, isDone:false}])
    }
    setTodo("");
  }
  const onDragEnd = (result: DropResult) => {
    const {destination, source} = result;

    if(!destination) return
    if(destination.droppableId === source.droppableId && destination.index === destination.index ) return

    let add,
    active = todos,
    Completed = completedTodo

    if(source.droppableId === "Todolist"){
      add = active[source.index]
      active.splice(source.index, 1)
    } else {
      add = Completed[source.index]
      Completed.splice(source.index, 1)
    }

    if(destination.droppableId === "Todolist"){
      active.splice(destination.index, 0, add)
    } else {
      Completed.splice(destination.index, 0, add)
    }
    setCompletedTodo(Completed)
    setTodos(active)


  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <span className="heading">
          Tasker
        </span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList 
          todos={todos} 
          setTodos={setTodos} 
          completedTodos={completedTodo}
          setCompletedTodos={setCompletedTodo}
          />
      </div>
    </DragDropContext>
  )
}

export default App