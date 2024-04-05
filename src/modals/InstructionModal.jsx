import React from "react";
import {Modal} from "../components/Modal";

export function InstructionModal(props) {
    const {isOpen, onClose} = props;
    return (
        <Modal
            title='Instructions'
            isOpen={isOpen}
            setModalClose={onClose}
            yellowModal={true}
            hasSubmit={false}
            width={'600px'}
        >
            <ol>
                <li>Create and Delete Notes through the buttons on the left.</li>
                <li>Add or Remove Rows and Columns to change the layout through the buttons on the left.</li>
                <li>Move Notes by dragging them to a new location.</li>
                <li>Edit Notes by clicking on them.</li>
                <li>Save and Load Notes through the Manage Notes button.</li>
            </ol>
        </Modal>
    );
}