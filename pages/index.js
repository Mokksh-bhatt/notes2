import Login from '../components/Login';
import { Alert, Avatar, Container, Button, Snackbar, Typography } from '@mui/material'
import { useState } from 'react'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import { TodoContext } from './TodoContext';
import { Box } from '@mui/system';
import { useAuth } from '../Auth'
import { auth, db } from '../firebase';
import { verifyIdToken } from '../firebaseAdmin';
import nookies from 'nookies';
import { collection, getDocs, orderBy, query, where,doc } from '@firebase/firestore';

export default function Home({ todosProps }) {
  const {currentUser} = useAuth();
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [todo, setTodo] = useState({title:'',milk:''})
  const showAlert = (type, msg) => {
    setAlertType(type);
    setAlertMessage(msg);
    setOpen(true);
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <TodoContext.Provider value={{ showAlert, todo, setTodo }}>
    <Container maxWidth="sm">
      <Box sx={{display: 'flex', justifyContent:'space-between' }} mt={3}>
        <Avatar src={currentUser.photoURL} />

        <Typography variant='h5'>
          {currentUser.displayName}
          <Button variant="contained" style={{height:'40px', marginLeft:'20px'}} onClick={()=>auth.signOut()}>
      <h5>Sign Out</h5>
        </Button >
        </Typography>
      </Box>
      <TodoForm/>
       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <TodoList todosProps={todosProps} />
    </Container>
    </TodoContext.Provider>
  )
}

export async function getServerSideProps(context) {

  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { email } = token;
    const collectionRef = collection(db, "todos")
    const q = query(collectionRef, where("email", "==", email), orderBy("timestamp", "milk"));
    const querySnapshot = await getDocs(q);
    let todos = [];
    querySnapshot.forEach((doc) => {
      todos.push({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp.toDate().getTime() });
    });
    return {

      props: {
        todosProps: JSON.stringify(todos) || [],

      }
    };
  } catch (error) {
    return { props: {} };
  }



}

