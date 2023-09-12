import NoteContext from "./NoteContext"
import React, {useState} from "react";

const NoteState = (props) => {
    const initialNotes = []
    const [notes, setNotes] = useState(initialNotes);
    let url="http://127.0.0.1:4000/api"

    // Get all Notes
    const getNotes = async () => {
      // console.log('Get all Notes CALLED')
      // API CALL 
      const response = await fetch(`${url}/notes/fetchallnotes`,{
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
      })
      const notes = await response.json()
      setNotes(notes)
    }

    // Add a Note
    const addNote = async (title, description, tags) => {
      // console.log('ADDNOTE FUNCTION CALLED')
      // API CALL
      const response = await fetch(`${url}/notes/addnote`,{
        method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({"title":title, "description": description,"tags": tags})
      })
      const note = await response.json()
      setNotes(notes.concat(note))
    }
    
    // Delete a Note
    const deleteNote = async (id) => {
      // console.log('Delete function called')
      // API Call 
      const newNotes = notes.filter((note)=>{
        return note._id !== id
      })
      setNotes(newNotes)
      // eslint-disable-next-line
      const response = await fetch(`${url}/notes/deletenote/${(id)}`,{
        method:'DELETE',
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
      })
    }

    // Edit a Note
    const editNote = async (id,title,description,tags) => {
      // eslint-disable-next-line
      const response = await fetch(`${url}/notes/updatenote/${id}`,{
          method:'PUT',
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({
            "title":title,
            "description": description,
            "tags": tags
          })
      })

      const newNotes = JSON.parse(JSON.stringify(notes))
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id === id){
            element.title = title
            element.description = description
            element.tags = tags
            break
        }
      }
      setNotes(newNotes)
    }
    
    return (
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;