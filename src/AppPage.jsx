import {Droppable} from "./Droppable";
import Grid from "./Grid";
import {Draggable} from "./Draggable";
import React from "react";

function AppPage(props) {
    const {unplacedNotes, placedNotes, setPlacedNotes, setUnplacedNotes, rows, columns, setRows, setColumns} = props;

    const containers = Array.from({ length: rows * columns }, (_, index) => index + 1);

    function addNote() {
        let highestId = rows * columns + 1;
        if (unplacedNotes.length > 0) {
            highestId = unplacedNotes.reduce((acc, note) => {
                return note.id > acc ? note.id : acc;
            });
        }
        const newNote = {id: highestId + 1, text: `note${unplacedNotes.length + placedNotes.length + 1}`};
        setUnplacedNotes([...unplacedNotes, newNote]);
    }

    function handlePlacedNoteClick(id) {
        const note = placedNotes.find((note) => note.id === id);
        const newText = prompt('Enter new text:', note.text);
        if (newText) {
            const newPlacedNotes = placedNotes.map((note) => {
                if (note.id === id) {
                    return {...note, text: newText};
                }
                return note;
            });
            setPlacedNotes(newPlacedNotes);
        }
    }

    function handleUnplacedNoteClick(id) {
        const newText = prompt('Enter new text:');
        if (newText) {
            const newUnplacedNotes = unplacedNotes.map((note) => {
                if (note.id === id) {
                    return {...note, text: newText};
                }
                return note;
            });
            setUnplacedNotes(newUnplacedNotes);
        }
    }

    function handleSave() {
        const notes = {unplacedNotes, placedNotes, rows, columns};
        const notesJson = JSON.stringify(notes);
        localStorage.setItem('notes', notesJson);
    }

    function handleLoad() {
        const notesJson = localStorage.getItem('notes');
        if (notesJson) {
            const notes = JSON.parse(notesJson);
            setUnplacedNotes(notes.unplacedNotes);
            setPlacedNotes(notes.placedNotes);
            setRows(notes.rows);
            setColumns(notes.columns);
        }
    }

    return (
        <div>
            <h1 className='centered'>Notes App</h1>
            <p className='centered'>
                Welcome to the Notes App! Here you can structure your notes. <br></br>
                {/*Create and Delete Notes through the buttons on the left. <br></br>*/}
                {/*Add or Remove Rows and Columns to change the layout through the buttons on the left. <br></br>*/}
                {/*Move Notes by dragging them to a new location. <br></br>*/}
                {/*Edit Notes by clicking on them. <br></br>*/}
            </p>
            <button className='button addButton' onClick={() => addNote()}>New Note</button>
            <button className='button rowButton1' onClick={() => setRows(rows + 1)}>+ Row</button>
            <button className='button rowButton2' onClick={() => setRows(rows - 1)}>- Row</button>
            <button className='button colButton1' onClick={() => setColumns(columns + 1)}>+ Column</button>
            <button className='button colButton2' onClick={() => setColumns(columns - 1)}>- Column</button>
            <Droppable key={'delete'} id={'delete'}>
                Delete Note
            </Droppable>
            <button className='button saveButton' onClick={() => handleSave()}>
                Save Notes
            </button>
            <button className='button loadButton' onClick={() => handleLoad()}>
                Load Notes
            </button>
            <Grid columns={5}>
                {unplacedNotes.map((note) => (
                    <Draggable id={note.id} handleNoteClick={handleUnplacedNoteClick}>
                        {note.text}
                    </Draggable>
                ))}
            </Grid>
            <Grid columns={columns}>
                {containers.map((id) => {
                    const note = placedNotes.find((note) => note.id === id);
                    return (
                        <Droppable key={id} id={id}>
                            {note ?
                                <Draggable key={note.text} id={note.id} handleNoteClick={handlePlacedNoteClick}>
                                    {note.text}
                                </Draggable>
                                : undefined}
                        </Droppable>
                    );
                })}
            </Grid>
        </div>
    );
}

export default AppPage;