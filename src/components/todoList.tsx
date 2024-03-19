import React from 'react'
import { Todo } from '../Todo';
import './style.css';
import SingleTodo from './singleTodo';
import { Droppable } from 'react-beautiful-dnd';


interface props{
    todos:Todo[];
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos:React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList:React.FC<props> = ({todos, setTodos,completedTodos, setCompletedTodos}) => {
  return (
    <div className="container">
     <Droppable droppableId='Todolist'>
      {
        (provided,snapshot) => (
          <div className={`todos ${snapshot.isDraggingOver? "dragactive" : ""}`} 
            ref={provided.innerRef} 
            {...provided.droppableProps}>
            <span className="todos_heading">
              Active Tasks
            </span>
              {todos.map((todo,index) => (
                  <SingleTodo 
                    index={index}
                    key={todo.id}  
                    todo={todo} 
                    todos={todos}  
                    setTodos={setTodos} 
                  />
              ))}
              {provided.placeholder}
          </div>
        )
      }
     </Droppable>
     <Droppable droppableId='RemoveTodo'>
      {
        (provided, snapshot) => (
     <div className={`todos remove ${snapshot.isDraggingOver? "dragcomplete" : ""}`} 
      ref={provided.innerRef} 
      {...provided.droppableProps}>
      <span className="todos_heading">
        Completed Tasks
      </span>
        {completedTodos.map((todo,index) => (
            <SingleTodo 
              index={index}
              key={todo.id}  
              todo={todo} 
              todos={completedTodos}  
              setTodos={setCompletedTodos}  
            />
        ))}
        {provided.placeholder}
    </div>
        )
      }
     </Droppable>

   </div>
  )
}

export default TodoList