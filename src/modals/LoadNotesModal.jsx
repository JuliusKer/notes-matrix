import {Modal} from "../components/Modal";
import {Select} from "../components/Select";
import {useState} from "react";
import {map} from "lodash";

export function LoadNotesModal(props) {
    const [selectedNote, setSelectedNote] = useState('');
    const returnNote = () => {
        props.onClose(selectedNote);
    }
    return (
        <Modal
            title='Load Notes'
            isOpen={props.isOpen}
            onClose={returnNote}
            setModalClose={props.setModalClose}
        >
            <Select
                title='Select which Notes to Load:'
                value={selectedNote}
                options={map(Object.keys(localStorage), name => ({value: name, label: name}))}
                onChange={setSelectedNote}
            />
        </Modal>
    )
}