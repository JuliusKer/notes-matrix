import {useState} from "react";
import "./styles/Modal.css";

export function Modal(props) {
    const {isOpen, onClose, setModalClose, hasSubmit = true, width} = props;
    const handleSubmit = () => {
        onClose();
        setModalClose();
    }

    const handleClose = () => {
        setModalClose();
    }

    return (
        <div className={isOpen ? 'modal open' : 'modal'} style={{width: width}}>
            <div className={`modalHeader ${props.yellowModal ? 'yellow' : ''}`}>
                <h2 className='centered'>{props.title}</h2>
            </div>
            <div className='modalBody'>
                {props.children}
            </div>
            <div className={`modalFooter ${props.yellowModal ? 'yellow' : ''}`}>
                <button className='closeButton' onClick={handleClose}>Close</button>
                {hasSubmit && <button className='submitButton' onClick={handleSubmit}>Submit</button>}
            </div>
        </div>
    );
}