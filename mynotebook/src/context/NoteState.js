import NoteContext from "./NoteContext";
import { useState,useEffect } from "react";
import Alert from "../components/Alert";

const NoteState = (props) => {
    const host = 'http://localhost:5000'
    const data = []
    const [state, setState] = useState(data);
    const [alert, setAlert] = useState(null);
    useEffect(() => {
        // Clear the alert after a certain time (e.g., 3 seconds)
        if (alert) {
          const timer = setTimeout(() => {
            setAlert(null);
          }, 1500);
    
          return () => clearTimeout(timer);
        }
      }, [alert])


    const getNote = async () => {
        console.log('fetch')
        try{
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authToken')
            }
        });
        const allnote = await response.json()
        setState(allnote)
    }catch(err){
        console.log(err)
    }
    }


    const addNote =async ({title,description,tag}) => {
        try{
            const response = await fetch(`${host}/api/notes/addnotes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token':localStorage.getItem('authToken')
                },
                body: JSON.stringify({title,description,tag}),
            });
            const allnote = await response.json()
            console.log(allnote)
            setAlert({ type: 'success', msg: 'Added note successfully' });
            getNote()
            
            
            
        }catch(err){
            setAlert({ type: 'warning', msg: 'Failed to add note refer console for error' });
            console.log(err)
        }
        
    }

    const editNote = async ({_id,title,description,tag}) => {
        console.log(_id,title,description,tag)
        try{
            const response = await fetch(`${host}/api/notes/updatenotes/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token':localStorage.getItem('authToken')
                },
                body: JSON.stringify({title,description,tag}),
            });
            const allnote = await response.json()
            console.log(allnote)
            setAlert({ type: 'success', msg: 'Edited note successfully' });
            getNote()
            
            
        }catch(err){
            setAlert({ type: 'warning', msg: 'Failed to edit note refer console for error' });
            console.log(err)
        }
    }

    const deleteNote =async (id) => {
        console.log(id)
        try{
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    
                    'Content-Type': 'application/json',
                    'auth-token':localStorage.getItem('authToken')
                }
            });
            await response.json()
            getNote()
            setAlert({ type: 'success', msg: 'Deleted note successfully' });
        }catch(err){
            setAlert({ type: 'warning', msg: 'Failed to edit note refer console for error' });
            console.log(err)
        }
        // const newData = state.filter((element) => {
        //     return element._id !== id
        // })
        // setState(newData)
    }

    return (
        <>
        {/* {alert && <Alert msg={alert.msg} type={alert.type} />} */}
        {alert && (
                <div className="alert-wrapper down">
                    <Alert msg={alert.msg} type={alert.type} />
                </div>
                )}
        <NoteContext.Provider value={{ state, addNote, editNote, deleteNote, getNote,setAlert }}>
            {props.children}
        </NoteContext.Provider>
        
        
        </>
    )

}


export default NoteState