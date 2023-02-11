import React from "react";
import {motion} from 'framer-motion'

export default function Note(props){

    const [text, setText] = React.useState(props.note.text);
    const [inputValue,setInputValue] = React.useState(props.note.text);
    
    function setNewText(text) {
        setText(text);
        setInputValue(text)      
    }

    return(
        <div className="note"> 
            <motion.button 
                className="note--delete" 
                whileHover={{scale:1.2}} 
                onClick={()=> props.deleteNote(props.note.id)}>❌
            </motion.button>  

            <motion.button 
                className="note--edit"
                whileHover={{scale:1.2}} 
                onClick={()=> props.editMode(props.note.id)}>🖊️
            </motion.button>

            {/* decides if the normal note should be displayed, or an input with the original note and a button, which if clicked saves the new input as the new text attribute of the note */}
            {!props.note.edit ? `• ${props.note.text}` : 
                <div className="note--editMode"> 
                    •
                    <input 
                    className="note--editMode--input"
                        value={inputValue}
                        onChange={(event) => setNewText(event.target.value)}>
                    
                    </input> 
                    <button 
                        className="note--editMode--button" 
                        onClick={(()=>props.editNote(props.note.id,text))}
                        >save</button>
                </div>
            }


            <hr className="note--line"></hr>
        </div>  
    )
}