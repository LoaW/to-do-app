/* 
This component allows the user to add new to-do items to a Firestore collection by adding a new document
with the title as the title field and completed as false, and it is using the useState hook to manage 
the state of the to-do item text.
*/

import React from "react";
import { db } from "../firebase"
import { collection, addDoc } from "firebase/firestore"; // import Firestore's collection and addDoc functions

export default function AddToDo() {
    const [title, setTitle] = React.useState("") // useState hook to manage the state of the title

    // function to handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault() // prevent the default behavior of the form submission
        if (title !== '') { // check if the title is not an empty string
            await addDoc(collection(db, "todos"), { // add a new document to the "todos" collection
                title,
                completed: false,
            })
            setTitle("") // reset the title state to an empty string
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="input_container">
                <input
                    type="text"
                    placeholder="Enter Todo..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} // set the onChange to update the title state
                />
            </div>
            <div>
                <button>
                    Add new task
                </button>
            </div>
        </form>
    )
}