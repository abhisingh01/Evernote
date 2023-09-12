import React, {useContext, useState, useRef} from "react";
import NoteContext from "../Context/notes/NoteContext";
import Noteitem from './Noteitem'
import Addnote from "./Addnote";
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';

const Notes = (props) => {
    const navigate = useNavigate()
    const context = useContext(NoteContext);
    const {notes, getNotes, editNote} = context;
    const [note, setNote] = useState({eTitle:"",eDescription:"",eTags:"General"});
    const ref = useRef(null);
    const refClose = useRef(null)
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
            props.showAlert('All notes fetched successfully for logged in user','success')
        }
        else{
            navigate('login')
        }
        
        // eslint-disable-next-line
    }, []);

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({id:currentNote._id, eTitle:currentNote.title, eDescription: currentNote.description, eTags:currentNote.tags})
    }
    
    const handleOnChange = (e) => {
        setNote({...note, [e.target.name]:e.target.value})
    }

    const saveNote = (e) => {
        // console.log('Updating the notes... ', note)
        editNote(note.id,note.eTitle,note.eDescription,note.eTags)
        refClose.current.click()
        props.showAlert('Note has been successfully updated','success')
    }

    return (
        <>
            <Addnote showAlert = {props.showAlert}/>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="eTitle"
                                name="eTitle"
                                value={note.eTitle}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Description
                            </label>
                            <input type="text" className="form-control" id="eDescription" name="eDescription" value={note.eDescription} onChange={handleOnChange}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tags" className="form-label">
                                Tags
                            </label>
                            <input type="text" className="form-control" id="eTags" name="eTags" value={note.eTags} onChange={handleOnChange} />
                        </div>
                    </form>
                    </div>
                    <div className="modal-footer">
                    <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" disabled={note.eTitle.length<3 || note.eDescription.length<5 } className="btn btn-primary" onClick={saveNote}>Update Note</button>
                    </div>
                </div>
                </div>
            </div>
            <div className="container row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-3">
                    {notes.length === 0 && <h5 style={{fontWeight: "lighter"}}>No notes to display</h5>}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote = {updateNote} note={note} showAlert = {props.showAlert}/>
                })}
            </div>
        </>
        
    )
}

export default Notes
