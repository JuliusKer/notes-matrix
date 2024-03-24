import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';

import {Droppable} from './Droppable';
import {Draggable} from './Draggable';
import Grid from "./Grid";

function App() {
    // const containers = ['A', 'B', 'C'];
    const containers = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));

    const [parent, setParent] = useState(null);
    const draggableMarkup = (
        <Draggable id="draggable">Drag me</Draggable>
    );

    return (
        <DndContext onDragEnd={handleDragEnd}>
            {parent === null ? draggableMarkup : null}
            <Grid columns={5}>
                {containers.map((id) => (
                    <Droppable key={id} id={id}>
                        {parent === id ? draggableMarkup : 'Drop here'}
                    </Droppable>
                ))}
            </Grid>
            {/*{containers.map((id) => (*/}
            {/*    // We updated the Droppable component so it would accept an `id`*/}
            {/*    // prop and pass it to `useDroppable`*/}
            {/*    <Droppable key={id} id={id}>*/}
            {/*        {parent === id ? draggableMarkup : 'Drop here'}*/}
            {/*    </Droppable>*/}
            {/*))}*/}
        </DndContext>
    );

    function handleDragEnd(event) {
        const {over} = event;

        // If the item is dropped over a container, set it as the parent
        // otherwise reset the parent to `null`
        setParent(over ? over.id : null);
    }
};

export default App;
