import logo from './logo.svg';
import './App.css';
import {DndContext} from "@dnd-kit/core";
import {Draggable} from './Draggable';
import {Droppable} from './Droppable';

function App() {
  return (
    <div className="App">
      <DndContext>
        <Draggable>
          <div>Drag me!</div>
        </Draggable>
      </DndContext>
    </div>
  );
}

export default App;
