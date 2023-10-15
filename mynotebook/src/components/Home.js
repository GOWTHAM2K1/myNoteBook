import React, { useEffect } from 'react'
import NoteContext from '../context/NoteContext'
import { useContext } from 'react'
import NotesItem from './NotesItem'
import AddNote from './AddNote'

export default function Home() {
  const data = useContext(NoteContext)
  const {state,getNote} = data
  useEffect(()=>{
    getNote()
  },[])
  return (
    <>
    <AddNote/>
    <div className='container'>
    <h2 className='my-3'>Your Notes</h2>
      <div className='row'>
      {state.map((element)=>{
        return <NotesItem element={element} key={element._id}/>
      })}
      </div>
     
    </div>
    </>
  )
}
