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
                        <button className='submitButton' onClick={loadNotes}>
                            Load selected Notes
                        </button>
                        <button className='closeButton' onClick={deleteNotes}>
                            Delete selected Notes
                        </button>
                    </div>
                    <div>
                        {displayNotes(notes)}
                    </div>
                </div>
            )}
        </Modal>
    )
}