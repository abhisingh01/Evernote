import React, {useContext, useState} from "react";
import NoteContext from "../Context/notes/NoteContext";

const Addnote = (props) => {
    const context = useContext(NoteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"", description:"",tags:"General"});
    
    const handleOnChange = (e) => {
        setNote({...note, [e.target.name] : e.target.value})
    }
    const handleOnClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tags)
        props.showAlert('Note has been added successfully', 'success')
        setNote({title:"", description:"",tags:"General"});

    }
    return (
        <>
            <div className="container my-3">
                <h2>Add Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={note.title}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleOnChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tags" className="form-label">
                            Tags
                        </label>
                        <input type="text" className="form-control" id="tags" name="tags" value={note.tags} onChange={handleOnChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={note.title.length<3 || note.description.length<5 } onClick={handleOnClick}>
                        Add Note
                    </button>
                </form>
            </div>
        </>
    );
};

export default Addnote;
