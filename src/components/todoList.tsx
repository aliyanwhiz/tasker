import React from 'react'
import { Todo } from '../Todo';
import './style.css';


interface props{
    todos:Todo[];
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList:React.FC<props> = ({todos, setTodos}) => {
  return (
    <div className="todos">
        {todos.map((todo) => (
            <li>{todo.task}</li>
        ))}
    </div>
  )
}

export default TodoList