import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../Todo'
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineDone } from "react-icons/md";
import { Draggable } from 'react-beautiful-dnd';

type props = {
    todo: Todo;
    todos: Todo[];
    index: number;
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo:React.FC<props> = ({todo, todos, setTodos,index}) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.task)
    const handleDone = (id: number) => {
        setTodos(
            todos.map((todo) => (
                todo.id === id ? {...todo, isDone : !todo.isDone }: todo
            ))
        )
    } 
    const handleDelete = (id: number) => {
        setTodos(
            todos.filter((todo) => todo.id !== id)
        )
    } 
    const handleEdit = (e:React.FormEvent, id:number) => {
        e.preventDefault();
        setTodos(todos.map((todo) => (
            todo.id === id ? {...todo,task:editTodo}:todo
        )));
        setEdit(false)
    }

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit])
    

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
        {
            (provided,snapshot) => (

                <form 
                    className={`todo_single ${snapshot.isDragging? "dragging" : ""} `} 
                    onSubmit={(e) => handleEdit(e,todo.id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {
                        edit ? (
                        <input 
                            value={editTodo} 
                            ref={inputRef}  
                            className="todo_single--text" 
                            onChange={(e) => setEditTodo(e.target.value)} 
                        />
                        ):(
                            todo.isDone ? (
                            <s className="todo_single--text done">
                                {todo.task}
                            </s>
                            ):(
                            <span className="todo_single--text">
                                {todo.task}
                            </span>
                            )
                        )
                    }
                    <div className="icons_tray">
                        <span className="icon" onClick={
                            () => {
                                if(!edit && !todo.isDone){
                                    setEdit(!edit)
                                }
                            }
                        }>
                            <FiEdit2 />
                        </span>
                        <span className="icon" onClick={() => handleDelete(todo.id)}>
                            <RiDeleteBin6Line />
                        </span>
                        <span className="icon" onClick={() => handleDone(todo.id)}>
                            <MdOutlineDone />
                        </span>
                    </div>
                </form>
            )
        }
    </Draggable>
  )
}

export default SingleTodo