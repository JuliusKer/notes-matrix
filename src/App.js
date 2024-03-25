import React, {useState} from 'react';
import {
    DndContext,
    KeyboardSensor,
    MouseSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';

import {Droppable} from './Droppable';
import {Draggable} from './Draggable';
import Grid from "./Grid";

function App() {

    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 0.01
        }
    })
    const mouseSensor = useSensor(MouseSensor)
    const touchSensor = useSensor(TouchSensor)
    const keyboardSensor = useSensor(KeyboardSensor)

    const sensors = useSensors(
        mouseSensor,
        touchSensor,
        keyboardSensor,
        pointerSensor
    )

    const [columns, setColumns] = useState(5);
    const [rows, setRows] = useState(5);
    const [placedNotes, setPlacedNotes] = useState([]);
    const [unplacedNotes, setUnplacedNotes] = useState([]);

    const containers = Array.from({ length: rows * columns }, (_, index) => index + 1);
    const addNote = () => {
        const newNote = {id: rows * columns + unplacedNotes.length, text: `note${unplacedNotes.length + placedNotes.length + 1}`};
        setUnplacedNotes([...unplacedNotes, newNote]);
    }
    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <button className='button addButton' onClick={() => addNote()}>Add Note</button>
            <button className='button rowButton1' onClick={() => setRows(rows + 1)}>Add Row</button>
            <button className='button rowButton2' onClick={() => setRows(rows - 1)}>Remove Row</button>
            <button className='button colButton1' onClick={() => setColumns(columns + 1)}>Add Column</button>
            <button className='button colButton2' onClick={() => setColumns(columns - 1)}>Remove Column</button>
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
        </DndContext>
    );

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

    function handleDragEnd(event) {
        const {active, over} = event;

        const movedUnplacedNote = unplacedNotes.find((note) => note.id === active.id);
        const movedPlacedNote = placedNotes.find((note) => note.id === active.id);
        const replacedNote = placedNotes.find((note) => note.id === over?.id);

        if (over) {
            if (movedUnplacedNote) {
                let newUnplacedNotes = unplacedNotes.filter((note) => note.id !== active.id);
                let newPlacedNotes = placedNotes;
                if (replacedNote) {
                    newUnplacedNotes.push(replacedNote);
                    newPlacedNotes = placedNotes.filter((note) => note.id !== replacedNote.id);
                }
                if (newUnplacedNotes) {
                    newUnplacedNotes = newUnplacedNotes.map((note, count) => {
                        return {...note, id: rows * columns + 1 + count};
                    });
                }

                newPlacedNotes = newPlacedNotes.map((note) => {
                    if (note.id === over.id) {
                        return {...note, id: active.id};
                    }
                    return note;
                });
                newPlacedNotes.push({...movedUnplacedNote, id: over.id});
                setUnplacedNotes(newUnplacedNotes);
                setPlacedNotes(newPlacedNotes);
            } else {
                const newPlacedNotes = placedNotes.map((note) => {
                    if (note.id === active.id) {
                        return {...note, id: over.id};
                    }
                    if (note.id === over.id) {
                        return {...note, id: active.id};
                    }
                    return note;
                });
                setPlacedNotes(newPlacedNotes);
            }
        } else {
            if (movedUnplacedNote) return;
            let newUnplacedNotes = unplacedNotes;
            newUnplacedNotes.push(movedPlacedNote);
            newUnplacedNotes = newUnplacedNotes.map((note, count) => {
                return {text: note.text, id: rows * columns + 1 + count};
            })
            const newPlacedNotes = placedNotes.filter((note) => note.id !== active.id);
            setUnplacedNotes(newUnplacedNotes);
            setPlacedNotes(newPlacedNotes);
        }
    }
};

export default App;
