import React from "react";

export function InstructionModal(props) {
    const {isOpen, onClose} = props;
    return (
        <div className={isOpen ? 'modal open' : 'modal'}>
            <div className='modalHeader'>
                <h2 className='centered'>Instructions</h2>
            </div>
            <p>
                <ol>
                    <li>Create and Delete Notes through the buttons on the left.</li>
                    <li>Add or Remove Rows and Columns to change the layout through the buttons on the left.</li>
                    <li>Move Notes by dragging them to a new location.</li>
                    <li>Edit Notes by clicking on them.</li>
                </ol>
            </p>
            <div className='modalFooter'>
                <button className='closeButton' onClick={onClose}>Close</button>
            </div>
        </div>
    );
}