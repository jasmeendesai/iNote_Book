import NoteContext from "./NoteContext";
import {useState} from "react";

const NoteState = (props)=>{
    
    const host = "http://localhost:5000"
    
    const initialState = []
    const [notes, setNotes] = useState(initialState)
    // const [notes, setNotes] = useState([])

    //addNote
    const addNote = async (title, description, tag)=>{
        //Todo Api call
        const response = await fetch(`${host}/api/notes/creteNotes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
          });
          const json = await response.json()
        const note = json.data
        setNotes(notes.concat(note))
        return json
    }
    //getNote
    const getNote = async()=>{
        const response = await fetch(`${host}/api/notes/getNotes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "token": localStorage.getItem('token')
            }
          });
          const json = await response.json()
      
          setNotes(json.data)      
    }

    //updateNote
    const updateNote = async (id, title, description, tag)=>{
        //Todo Api call
        const response = await fetch(`${host}/api/notes/update/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              "token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
          });
          const json = await response.json()
        const updatenote = notes.map((note)=>{
            if(note._id===id){
              if(title)
                note.title = title
              if(description)
                note.description = description
              if(tag)
                note.tag=tag
            }
            return note
        })
        setNotes(updatenote)
        return json
    }

    //deleteNote
    const deleteNote = async (id)=>{
        //Todo Api call
        const response = await fetch(`${host}/api/notes/delete/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              "token": localStorage.getItem('token')
            }
          });
          const json = await response.json()
          
        const newNotes= notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
        return json
    }


    return(
        <NoteContext.Provider value={{notes, addNote, updateNote, deleteNote, getNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState