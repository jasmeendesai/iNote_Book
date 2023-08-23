import React, { useContext, useEffect, useRef, useState, } from "react";
import noteContext from "../contexts/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import {useNavigate} from 'react-router-dom'

function Note(props) {
  const {showAlert}=props
  const context = useContext(noteContext);
  const { notes, getNote, updateNote } = context;
  const navigate = useNavigate();

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNote();
    }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line
  }, []);

  const update = (currentnote) => {
    ref.current.click();

    setNote({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    });
  };

  const handleCLick = async (e) => {
    const json = await updateNote(note.id, note.etitle, note.edescription, note.etag);
    if(json.status===true){
      showAlert(json.message, 'success')
    }else{
      showAlert(json.message, 'danger')
    }
    refClose.current.click();
  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={showAlert}/>

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={handleChange}
                    minLength={3}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={handleChange}
                    minLength={3}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary d-none"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                disabled={note.etitle.length<3 || note.edescription.length<3}
                className="btn btn-primary"
                onClick={handleCLick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="my-3 mx-3">
        <h2 className="mb-3">Your Notes</h2>
        <div className="mx-3">
        {notes.length===0 && 'No notes to display'}
        </div>
        <div className="row">
          {notes.map((note) => {
            return <NoteItem key={note._id} update={update} note={note} showAlert={showAlert}/>;
          })}
        </div>
      </div>
    </>
  );
}

export default Note;
