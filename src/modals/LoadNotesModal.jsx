import {Modal} from "../components/Modal";
import {Select} from "../components/Select";
import {useState} from "react";
import {map} from "lodash";

export function LoadNotesModal(props) {
    const [selectedNote, setSelectedNote] = useState('');
    const options = map(Object.keys(localStorage), name => ({value: name, label: name}));
    options.sort((a, b) => a.label.localeCompare(b.label));
    const returnNote = () => {
        props.onClose(selectedNote);
    }
    return (
        <Modal
            title='Load Notes'
            isOpen={props.isOpen}
            onClose={returnNote}
            setModalClose={props.setModalClose}
            submitButtonText='Load'
        >
            <Select
                title='Select which Notes to Load:'
                value={selectedNote}
                options={options}
                onChange={setSelectedNote}
            />
        </Modal>
    )
}