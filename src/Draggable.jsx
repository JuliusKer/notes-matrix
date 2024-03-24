import React from 'react';
import {useDraggable} from '@dnd-kit/core';

export function Draggable(props) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.id,
    });

    const inlineStyle = {
        opacity: transform ? '0.5' : '1',
        transformOrigin: '50% 50%',
        height: '140px',
        width: '140px',
        borderRadius: '10px',
        cursor: transform ? 'grabbing' : 'grab',
        backgroundColor: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: transform  ? 'rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px' : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px',
        // transform: transform ? 'scale(1.05)' : 'scale(1)',
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    };


    return (
        <button ref={setNodeRef} style={inlineStyle} {...listeners} {...attributes}>
            {props.children}
        </button>
    );
}