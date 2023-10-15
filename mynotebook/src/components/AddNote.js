import React, { useState } from 'react'
import { useContext } from 'react'
import NoteContext from '../context/NoteContext'


const AddNote = () => {
    const context = useContext(NoteContext)
    const handleClick=(e)=>{
        e.preventDefault()
        context.addNote(note);
    }
    const [note,setNote] = useState({title:"",description:"",tag:""})
    const handleChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div className='container'>
      <form>
        <div className="my-3">
        <h2>Add Note</h2>
          <label htmlFor="title" className="form-label">Title</label>
          <input type="email" className="form-control" id="title" aria-describedby="emailHelp" name='title' onChange={handleChange}/>
            
        </div>
        <div className="mb-3">
          <label htmlFor="Description" className="form-label">Description</label>
          <input type="text" className="form-control" id="Description" name='description' onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name='tag' onChange={handleChange}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
      </form>
      
    </div>
  )
}

export default AddNote
