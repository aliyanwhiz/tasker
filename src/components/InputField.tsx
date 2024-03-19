import React, { useRef } from 'react'
import './style.css'

interface props{
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e:React.FormEvent) => void
}

const InputField = ({todo, setTodo, handleAdd}:props) => {
    const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form className='input' onSubmit={(e) =>{
        handleAdd(e);
        inputRef.current?.blur();
    }}>
        <input type="text" value={todo} ref={inputRef} onChange={
            (e) => setTodo(e.target.value)
        } className='input_field' placeholder="Enter your task here..." />
        <button className='input_button' type='submit'>Add</button>
    </form>
  )
}

export default InputField