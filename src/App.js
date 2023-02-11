import React from "react";
import Note from "./Note"
import {motion} from 'framer-motion'

export default function App(){

    //2 varialbe state
    //1. current note that is updated after every keystroke in the input
    //2. note array
    const [note, setNote] = React.useState("")
    const [notesArray, setNotesArray] = React.useState([])

    function addCurrentNote (event){
        setNote(event.target.value);
    }

    function addToNotes(){
        setNotesArray(prevState => [...prevState,{text: note, visible: true, id: notesArray.length+1, edit: false}])
    }

    function deleteNote(id){
        setNotesArray(prevNotes => notesArray.map( note => note.id === id ? {...note, visible: false} : note))
    }

    function editMode(id){
        setNotesArray(prevNotes => prevNotes.map( note => note.id === id ? {...note,  edit: !note.edit}:note))
    }

    // This function finds the wanted note based on id, and changes its text attribute based on the input in form while in edit mode in the note component itself
    //so the array of notes and its text are stored in the APP, while it is edited in the NOTE
    function editNote(id,editedNote){
        setNotesArray(prevNotes => prevNotes.map( note => note.id === id ? {...note,  edit: !note.edit, text: editedNote} : note))
    }

    const notesElements = notesArray.filter(note => note.visible===true).map(note => <Note
        key={note.id}
        note={note}
        editMode = {editMode}
        editNote={editNote}
        deleteNote={deleteNote}

    />).reverse();

    return (
    <div className="app">
        <h1>ZOLES NOTES SITE</h1>
        
            <div className="app--new">
                <motion.button   
                        whileHover={{scale:1.2}}
                        className="app--submit" 
                        onClick={addToNotes}>Add
                </motion.button>

                <input className="app--input" 
                        onChange={addCurrentNote}
                        placeholder="Enter note.."
                        >        
                </input>
            </div>
            {notesElements}
            
    </div>)
}