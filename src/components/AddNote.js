import React, { useContext, useState } from 'react'
import noteContext from '../contexts/notes/NoteContext'

function AddNote(props) {
    const {showAlert}= props
    const context = useContext(noteContext)
    const {addNote} = context
   

    const [note, setNote] = useState({title : '', description : '', tag : ''})

    const handleCLick = async (e)=>{
        e.preventDefault()
        const json = await addNote(note.title, note.description, note.tag)

        if(json.status===true){
          showAlert(json.message, 'success')
        }else{
          showAlert(json.message, 'danger')
        }
        setNote({title : '', description : '', tag : ''})

      }
      const handleChange =(e)=>{
        setNote({...note, [e.target.name] : e.target.value})
      }
  return (
    <div className="container my-3 mx-2">
    <h2>Add a Note</h2>
    <form className="my-3">
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" onChange={handleChange} value={note.title} minLength={3} required/>
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" onChange={handleChange} value={note.description} minLength={3} required/>
        </div>
        <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" onChange={handleChange} value={note.tag}/>
        </div>

        <button type="submit" disabled={note.title.length<3 || note.description.length<3}className="btn btn-primary" onClick={handleCLick}>Add Note</button>
    </form>

    </div>
  )
}

export default AddNote
