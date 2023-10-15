import React from 'react'
import { useContext, useState } from 'react'
import NoteContext from '../context/NoteContext'
import EditPopup from './EditPopup';



const NotesItem = (props) => {
    const context = useContext(NoteContext)
    const { deleteNote,editNote } = context

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const editedContent= props.element;

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handleEditSubmit = async (content) => {
        editNote(content);
    }


    return (
        <>
            <div className='col-md-3 my-3 mx-1'>
                <div className="card mb-4" style={{ width: "18rem" }}>
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{props.element.title}</h5>
                        <p className="card-text">{props.element.description}</p>
                        <button className="btn btn-primary mx-2" type="submit" onClick={openPopup}>Edit</button>
                        <button className="btn btn-danger" type="submit" onClick={() => { deleteNote(props.element._id) }}>Delete</button>
                        <EditPopup
                            isOpen={isPopupOpen}
                            editedContent1 = {editedContent}
                            onRequestClose={closePopup}
                            onSubmit={handleEditSubmit}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotesItem
