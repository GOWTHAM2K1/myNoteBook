import React, { useState } from 'react';
import Modal from 'react-modal';

const EditPopup = ({ isOpen,editedContent1, onRequestClose, onSubmit }) => {
    const [editedContent, setEditedContent] = useState(editedContent1);
    const handleInputChange = (e) => {
        setEditedContent({...editedContent,[e.target.name]:e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(editedContent);

        onRequestClose();
    };

    // Custom CSS styles for the modal
    const customStyles = {
        content: {
            width: '60%', // Set a minimum width of 60% of the screen size
            maxWidth: '80%', // Limit the maximum width if needed
            margin: 'auto',
            top: '10%',
            borderRadius: '10px', // Rounded corners
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            backgroundColor: 'white',
            padding: '20px',
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Edit Popup"
            style={customStyles}
        >
            <h2>Edit Content</h2>

            <div className="mb-3">
                <label htmlFor="editTitle" className="form-label">Title </label>
                <input type="text" className="form-control" id="editTitle" name='title' value={editedContent.title} onChange={handleInputChange} />
            </div>

            <div className="mb-3">
                <label htmlFor="editDescription" className="form-label">Description</label>
                <input type="text" className="form-control" id="editDescription" name='description' value={editedContent.description} onChange={handleInputChange} />
            </div>

            <div className="mb-3">
                <label htmlFor="editTag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="editTag" name='tag' value={editedContent.tag} onChange={handleInputChange} />
            </div>

        


            <div style={{ display: 'flex', justifyContent: 'center' }}>


                <button
                    onClick={handleSubmit}
                    style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer',
                        marginRight: '10px',
                    }}
                >
                    Submit
                </button>
                <button
                    onClick={onRequestClose}
                    style={{
                        backgroundColor: '#ccc',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
};

export default EditPopup;
