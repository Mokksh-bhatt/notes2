import { async } from "@firebase/util"
import { Button, TextField } from "@mui/material"
import { addDoc, collection, serverTimestamp, doc, updateDoc } from "firebase/firestore"
import { useContext, useEffect, useRef, useState } from "react"
import { db } from "../firebase"
import { TodoContext } from "../pages/TodoContext"
import { useAuth } from '../Auth'

const TodoForm = ({}) => {
    const inputAreaRef = useRef();
    const {currentUser} = useAuth();
    const {showAlert, todo, setTodo} = useContext(TodoContext);
    const onSubmit = async() => {
        if (todo?.hasOwnProperty('timestamp')) {
            const docRef = doc(db, "todos", todo.id);
            const todoUpdate = { ...todo, timestamp: serverTimestamp() }
            updateDoc(docRef, todoUpdate)
            setTodo({ title:'', milk:''});
            showAlert('info', 'Success')
        } else {
            const collectionRef = collection(db, "todos");
            const docRef = await addDoc(collectionRef, { ...todo,email:currentUser.email, timestamp:
            serverTimestamp() })
            setTodo({ title: '', milk: ''})
            showAlert('success','Updated')
        }
        

    }

    useEffect(() => {
        const clickedoutside = e => {
            if(!inputAreaRef.current.contains(e.target)) {
                setTodo({ title:'', milk: ''})
            } else {
                console.log('inside');
            }
        }

        document.addEventListener("mousedown", clickedoutside)
        return() => {
            document.removeEventListener("mousedown", clickedoutside)
        }
    })

    return (
      <div ref={inputAreaRef}>
        <TextField fullWidth label="name" margin="normal"
            value={todo.title}
            onChange={e=>setTodo({...todo,title: e.target.value})}
        />
        <TextField fullWidth label="milk"
            value={todo.milk}
            onChange={e=>setTodo({...todo,milk: e.target.value})}
        />
        <Button variant="contained" onClick={onSubmit} sx={{ mt: 3 }}>
            {todo.hasOwnProperty('timestamp')?'Update':'Add'}</Button>
      </div>
    )
}

export default TodoForm
