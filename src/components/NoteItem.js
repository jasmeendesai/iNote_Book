import React, { useContext} from 'react'
import noteContext from '../contexts/notes/NoteContext'

function NoteItem(props) {
  const { title, description, _id} = props.note;
  const {update, note, showAlert}= props
  const context = useContext(noteContext)
    const {deleteNote} = context

  const handleDelete = async()=>{

    const json = await deleteNote(_id)
    if(json.status===true){
      showAlert(json.message, 'success')
    }else{
      showAlert(json.message, 'danger')
    }

  }
  const handleUpdate = ()=>{
    update(note)
  }
  return (
    <div className="col-md-4">
      <div className="card my-3 mx-4">
        <div className="card-body">
  
        <div className="container">
          
          <i className="far fa-edit mx-2" style={{display:'flex', justifyContent: 'flex-end', position:'absolute', right:'20px'}}onClick={handleUpdate}></i>
          <i className="far fa-trash-alt mx-2" style={{display:'flex', justifyContent: 'flex-end', position:'absolute', right:'0'}}onClick={handleDelete}></i>
          <h5 className="card-title">{title}</h5>
        </div>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
