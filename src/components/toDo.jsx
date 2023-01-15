import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

/*
Todo is a React component that takes as input a "todo" object with the task information, 
as well as functions to manage the possible actions on this task
*/
export default function Todo({ todo, toggleComplete, handleDelete, handleEdit, }) {
    // Using React's local state to handle the modified title of a task being edited
    const [newTitle, setNewTitle] = React.useState(todo.title);

    // Function to handle title changes of the task
    const handleChange = (e) => {
        e.preventDefault();
        if (todo.complete === true) {
            // If the task is marked as complete, set the original title
            setNewTitle(todo.title);
        } else {
            todo.title = "";
            setNewTitle(e.target.value);
        }
    };
    return (
        <div className="todo">
            <input
                style={{ textDecoration: todo.completed && "line-through" }}
                type="text"
                value={todo.title === "" ? newTitle : todo.title}
                className="list"
                onChange={handleChange}
            />
            <div>
                <button
                    className="button-complete"
                    onClick={() => toggleComplete(todo)}
                >
                    <CheckCircleIcon id="i" />
                </button>
                <button
                    className="button-edit"
                    onClick={() => handleEdit(todo, newTitle)}
                >
                    <EditIcon id="i" />
                </button>
                <button className="button-delete" onClick={() => handleDelete(todo.id)}>
                    <DeleteIcon id="i" />
                </button>
            </div>
        </div>
    );
}