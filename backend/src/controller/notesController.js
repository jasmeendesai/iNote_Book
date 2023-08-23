const NoteModel = require('../model/NoteModel')
// const UserModel = require("../model/UserModel");

const {
    isValid,
    isValidObjectId
  } = require("../utils/validator");


// Route 1 : create notes of logged in user using localhost:5000/api/notes/creteNotes
const createNotes = async(req, res)=>{
    try {
        const userId = req.userId
        const {title, description, tag} = req.body

        if (!title || !description) {
            return res
              .status(400)
              .send({ status: false, message: "Enter the required fields" });
        }

        if (!isValid(title) || title.length < 3) {
            return res
              .status(400)
              .send({ status: false, message: "Enter the valid title" });
        }

        if (!isValid(description) || description.length < 3) {
            return res
              .status(400)
              .send({ status: false, message: "Enter the valid description" });
        }
        if(tag){
            if (!isValid(tag)) {
                return res
                  .status(400)
                  .send({ status: false, message: "Enter the valid tag" });
            }
    
        }

        req.body.user = userId
        const createNote = await NoteModel.create(req.body)
        const {__v, user, ...data} = createNote._doc
        return res.status(201).send({
            status: true,
            message: "Notes completed Successfully",
            data: data,
          });
}
catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

// Route 2 : get all notes of logged in user using localhost:5000/api/notes/getNotes
const getNotes = async (req, res)=>{
    try {
        const userId = req.userId
        const notes = await NoteModel.find({user : userId})

        // if(notes.length===0){
        //     return res.status(404).send({ status: false, message: "No notes present"});
        // }

        return res.status(200).send({
            status: true,
            message: "Notes data",
            data: notes,
        });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }

}

// Route 3 : update notes of logged in user using localhost:5000/api/notes/update/:id
const updateNotes = async (req, res)=>{
    try {
        const noteId = req.params.id
        const {title, description,tag} = req.body

        if(!isValidObjectId(noteId)){
            return res.status(400).send({ status: false, message: "invalid notesid"})
        }

        const data = {} //update queries
        if(title){
            if (!isValid(title) || title.length < 3) {
                return res
                  .status(400)
                  .send({ status: false, message: "Enter the valid title" });
            }    
            data.title = title
        }
        
        if(description){
            if (!isValid(description) || description.length < 3) {
            return res
              .status(400)
              .send({ status: false, message: "Enter the valid description" });
            }
            data.description = description
        }
        if(tag){
            if (!isValid(tag)) {
                return res
                  .status(400)
                  .send({ status: false, message: "Enter the valid tag" });
            }
            data.tag = tag
        }

        const note = await NoteModel.findById(noteId)
        if(!note){
            return res.status(404).send({ status: false, message: "note not found"})
        }
        
        //user authorisation

        const userLoggedIn = req.userId
        const userToBeModify = note.user.toString()
        if(userLoggedIn!==userToBeModify){
            return res.status(403).send({ status: false, message: "you are not authorised" });
        }
        
        //update note
        const updatedNote = await NoteModel.findByIdAndUpdate(noteId, data, {new : true}).select({_id : 0, __v : 0, user : 0})

        return res.status(200).send({ status: true, message: "note is updated", data : updatedNote})


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

// Route 4 : delete notes of logged in user using localhost:5000/api/notes/delete/:id

const deleteNotes = async (req, res) =>{
    try {
        const noteId = req.params.id

        if(!isValidObjectId(noteId)){
            return res.status(400).send({ status: false, message: "invalid notesid"})
        }

        const note = await NoteModel.findById(noteId)
        if(!note){
            return res.status(404).send({ status: false, message: "note not found"})
        }
        
        //user authorisation

        const userLoggedIn = req.userId
        const userToBeModify = note.user.toString()
        if(userLoggedIn!==userToBeModify){
            return res.status(403).send({ status: false, message: "you are not authorised" });
        }
        
        await NoteModel.findByIdAndDelete(noteId)

        return res.status(200).send({ status: true, message: "note is deleted successfully" });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


module.exports = {createNotes, getNotes, updateNotes, deleteNotes}