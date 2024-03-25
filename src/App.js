import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';
import AppPage from "./AppPage";
import {useCustomSensors} from "./helpers";

function App() {

    const [columns, setColumns] = useState(5);
    const [rows, setRows] = useState(5);
    const [placedNotes, setPlacedNotes] = useState([]);
    const [unplacedNotes, setUnplacedNotes] = useState([]);

    return (
        <DndContext sensors={useCustomSensors()} onDragEnd={handleDragEnd}>
            <AppPage
                unplacedNotes={unplacedNotes}
                placedNotes={placedNotes}
                setPlacedNotes={setPlacedNotes}
                setUnplacedNotes={setUnplacedNotes}
                rows={rows}
                columns={columns}
                setRows={setRows}
                setColumns={setColumns}
            />
        </DndContext>
    );

    function handleDragEnd(event) {
        const {active, over} = event;

        const movedUnplacedNote = unplacedNotes.find((note) => note.id === active.id);
        const movedPlacedNote = placedNotes.find((note) => note.id === active.id);
        const replacedNote = placedNotes.find((note) => note.id === over?.id);

        if (over) {
            if (over.id === 'delete') {
                if (movedUnplacedNote) {
                    setUnplacedNotes(unplacedNotes.filter((note) => note.id !== active.id));
                } else {
                    setPlacedNotes(placedNotes.filter((note) => note.id !== active.id));
                }
                return;
            }
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
}

export default App;
