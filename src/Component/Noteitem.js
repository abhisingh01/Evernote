import React, { useContext} from 'react'
import NoteContext from '../Context/notes/NoteContext';

const Noteitem = (props) => {
    const {note, updateNote} = props
    const context = useContext(NoteContext);
    let {deleteNote} = context
    const onDeleteClick = (e) => {
        e.preventDefault()
        deleteNote(note._id)
        props.showAlert('Note has been successfully deleted','success')
    }

    return (
        <div className='col-md-3'>
        <div className="card my-3">
            <div className="card-body">
                <div className="d-flex flex-wrap align-items-center">
                    <h5 className="card-title">{note.title}</h5> 
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                    <i className="fa-solid fa-trash-can mx-2" onClick={onDeleteClick}></i>
                </div>
                <p className="card-text">{note.description}</p>
            </div>
        </div>
        </div>
    )
}

export default Noteitem
