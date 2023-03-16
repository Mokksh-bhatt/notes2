import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Icon, IconButton, ListItem, ListItemText } from "@mui/material"
import { deleteDoc, doc } from "firebase/firestore";
import moment from "moment"
import { useContext } from "react";
import { db } from "../firebase";
import { TodoContext } from "../pages/TodoContext";

const Todo = ({ id, timestamp, title, milk }) => {

    const {showAlert, setTodo} = useContext(TodoContext);
    const deletetodo = async (id,e) =>{
        const docRef = doc(db,"todos",id);
        await deleteDoc(docRef)
        showAlert('error', 'Deleted');
    }
    return (
        <ListItem onClick={()=>setTodo({id, title, timestamp, milk})}
            sx={{ mt: 3, boxShadow: 3 }}
            style={{ backgroundColor: '#FAFAFA' }}
            secondaryAction= {
                <>
                <IconButton onClick={e=>deletetodo(id,e)}>
                    <DeleteIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
                </>
            }
        >
            <ListItemText
                primary={[title," - ", milk, " L"]}
                
                secondary={moment(timestamp).format("MMMM do, yyyy")}
            />

        </ListItem>

    )
}

export default Todo
