import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props) {
    const {isOver, setNodeRef} = useDroppable({
        id: props.id,
    });

    const inlineStyle = {
        // color: isOver ? 'green' : undefined,
        backgroundColor: isOver ? 'lightgreen' : 'lightgrey',
        // opacity: transform ? '0.5' : '1',
        transformOrigin: '50% 50%',
        height: '140px',
        width: '140px',
        borderRadius: '10px',
        // cursor: transform ? 'grabbing' : 'grab',
        // backgroundColor: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // boxShadow: transform  ? 'rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px' : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px',
        // transform: transform ? 'scale(1.05)' : 'scale(1)',
        // transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    };


    return (
        <div ref={setNodeRef} style={inlineStyle}>
            {props.children}
        </div>
    );
}