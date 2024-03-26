import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props) {
    const {isOver, setNodeRef} = useDroppable({
        id: props.id,
    });

    const inlineStyle = {
        backgroundColor: isOver ? 'lightgreen' : 'lightgrey',
        transformOrigin: '50% 50%',
        height: '140px',
        width: '140px',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const deleteStyle = {
        backgroundColor: isOver ? 'red' : 'rgba(255,0,63,0.53)',
        transformOrigin: '50% 50%',
        height: '140px',
        width: '140px',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: '200px',
        left: '30px',
    };


    return (
        <div ref={setNodeRef} style={props.id !== 'delete' ? inlineStyle : deleteStyle}>
            {props.children}
        </div>
    );
}