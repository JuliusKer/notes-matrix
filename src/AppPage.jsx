import {Droppable} from "./components/Droppable";
import Grid from "./components/Grid";
import {Draggable} from "./components/Draggable";
import React from "react";
import {InstructionModal} from "./modals/InstructionModal";
import {LoadNotesModal} from "./modals/LoadNotesModal";
import {ManageNotesModal} from "./modals/ManageNotesModal";

function AppPage(props) {
    const {unplacedNotes, placedNotes, setPlacedNotes, setUnplacedNotes, rows, columns, setRows, setColumns} = props;

    const [instructionModalOpen, setInstructionModalOpen] = React.useState(false);
    const [manageNotesModalOpen, setManageNotesModalOpen] = React.useState(false);

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
        const note = unplacedNotes.find((note) => note.id === id);
        const newText = prompt('Enter new text:', note.text);
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

    function handleSaveWithName(name) {
        const notes = {unplacedNotes, placedNotes, rows, columns};
        const notesJson = JSON.stringify(notes);
        localStorage.setItem(name, notesJson);
    }

    function setNotes(notes) {
        setUnplacedNotes(notes.unplacedNotes);
        setPlacedNotes(notes.placedNotes);
        setRows(notes.rows);
        setColumns(notes.columns);
    }

    return (
        <div>
            <InstructionModal isOpen={instructionModalOpen} onClose={() => setInstructionModalOpen(false)}/>
            <ManageNotesModal
                isOpen={manageNotesModalOpen}
                setModalClose={() => setManageNotesModalOpen(false)}
                setNotes={setNotes}
                saveNotes={handleSaveWithName}
                currentNotes={{unplacedNotes, placedNotes}}
            />
            <h1 className='centered'>Notes App</h1>
            <p className='centered'>
                Welcome to the Notes App! Here you can structure your notes. <br></br>
            </p>
            <div className='actionMenu'>
                <button className='button addButton' onClick={() => addNote()}>New Note</button>
                <button className='button rowButton1' onClick={() => setRows(rows + 1)}>+ Row</button>
                <button className='button rowButton2' onClick={() => setRows(rows - 1)}>- Row</button>
                <button className='button colButton1' onClick={() => setColumns(columns + 1)}>+ Column</button>
                <button className='button colButton2' onClick={() => setColumns(columns - 1)}>- Column</button>
                <Droppable key={'delete'} id={'delete'}>Delete Note</Droppable>
                <button className='button manageButton' onClick={() => setManageNotesModalOpen(true)}>Manage Notes</button>
                <button className='button instructionsButton' onClick={() => setInstructionModalOpen(true)}>Instructions
                </button>
            </div>
            <Grid columns={5}>
                {unplacedNotes.map((note) => (
                    <Draggable key={note.id} id={note.id} handleNoteClick={handleUnplacedNoteClick}>
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
                                <Draggable key={note.id} id={note.id} handleNoteClick={handlePlacedNoteClick}>
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