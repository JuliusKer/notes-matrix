import {Modal} from "../components/Modal";
import {Select} from "../components/Select";
import {useState} from "react";
import {map} from "lodash";
import {TextInput} from "../components/TextInput";

export function ManageNotesModal(props) {
    const [selectedNote, setSelectedNote] = useState('');
    const [providedName, setProvidedName] = useState('');
    const [selectedTab, setSelectedTab] = useState('saveNotes');

    const options = map(Object.keys(localStorage), name => ({value: name, label: name}));
    options.sort((a, b) => a.label.localeCompare(b.label));
    const notes = JSON.parse(localStorage.getItem(selectedNote));
    const deleteNotes = () => {
        localStorage.removeItem(selectedNote);
        setSelectedNote('');
    }
    const loadNotes = () => {
        if (localStorage.getItem(selectedNote)) {
            const notesJson = localStorage.getItem(selectedNote);
            const notes = JSON.parse(notesJson);
            props.setNotes(notes);
        }
    }
    const saveNotes = () => {
        props.saveNotes(providedName);
        setProvidedName('')
    }

    const saveNotesToFile = () => {
        const link = document.createElement("a");
        const notesJson = localStorage.getItem(selectedNote);
        const file = new Blob([notesJson], { type: 'text/plain' });
        link.href = URL.createObjectURL(file);
        link.download = "sample.txt";
        link.click();
        URL.revokeObjectURL(link.href);
    };

    const loadNotesFromFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const notesJson = e.target.result;
            const notes = JSON.parse(notesJson);
            props.setNotes(notes);
        }
        reader.readAsText(file);
    }

    const displayNotes = (notes) => (
        <div>
            <h3>Placed Notes:</h3>
            <ol>
                {map(notes.placedNotes, (note) => (
                    <li key={note.id}>{note.text}</li>
                ))}
            </ol>
            <h3>Unplaced Notes:</h3>
            <ol>
                {map(notes.unplacedNotes, (note) => (
                    <li key={note.id}>{note.text}</li>
                ))}
            </ol>
        </div>
    )

    return (
        <Modal
            title='Manage Stored Notes'
            isOpen={props.isOpen}
            setModalClose={props.setModalClose}
            submitButtonText='Load'
            hasSubmit={false}
            width={'800px'}
        >
            <div className='tabs'>
                <button
                    className={selectedTab === 'saveNotes' ? 'selected' : ''}
                    onClick={() => setSelectedTab('saveNotes')}
                >
                    Save Notes
                </button>
                <button
                    className={selectedTab === 'manageSavedNotes' ? 'selected' : ''}
                    onClick={() => setSelectedTab('manageSavedNotes')}
                >
                    Manage Saved Notes
                </button>
            </div>
            {selectedTab === 'saveNotes' ? (
                <div className='manageNotesContainer'>
                    <div>
                        <TextInput
                            title='Name of new Notes:'
                            value={providedName}
                            onChange={setProvidedName}
                        />
                        <button className='submitButton' onClick={saveNotes}>
                            Save current Notes
                        </button>
                    </div>
                    <div>
                        {!!props.currentNotes && displayNotes(props.currentNotes)}
                    </div>
                </div>
            ) : (
                <div className='manageNotesContainer'>
                    <div>
                        <Select
                            title='Select a stored Notes:'
                            value={selectedNote}
                            options={options}
                            onChange={setSelectedNote}
                        />
                        <div className='manageActionsContainer'>
                            <span className='container'>
                                <p>Local Storage</p>
                                <button className='loadButton' onClick={loadNotes}>
                                    Load
                                </button>
                                <button className='closeButton' onClick={deleteNotes}>
                                    Delete
                                </button>
                            </span>
                            <span className='container'>
                                <p>File</p>
                                <button className='loadButton'
                                    onClick={loadNotesFromFile}>
                                    Load
                                </button>
                                <button className='submitButton' onClick={saveNotesToFile}>
                                    Save
                                </button>
                            </span>
                        </div>
                    </div>
                    <div>
                        {displayNotes(notes)}
                    </div>
                </div>
            )}
        </Modal>
    )
}