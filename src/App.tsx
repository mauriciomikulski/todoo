import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './App.css'
import InputField from './components/InputField'
import TodooList from './components/TodooList';
import { Todoo } from './models/models'

const App: React.FC = () => {
  const [todoo, setTodoo] = useState<string>("");
  const [todoos, setTodoos] = useState<Todoo[]>([]);
  const [CompletedTodoos, setCompletedTodoos] = useState<Array<Todoo>>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todoo) {
      setTodoos([...todoos, { id: Date.now(), todoo: todoo, isDone: false }]);
      setTodoo("");
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    let add,
      active = todoos,
      completed = CompletedTodoos;

    if (source.droppableId === "TodoosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    if (destination.droppableId === "TodoosList") {
      active.splice(destination.index, 0, add);
    } else { completed.splice(destination.index, 0, add); }
    setTodoos(active);
    setCompletedTodoos(completed);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">ToDoo</span>
        <InputField todoo={todoo} setTodoo={setTodoo} handleSubmit={handleSubmit} />
        <TodooList
          todoos={todoos}
          setTodoos={setTodoos}
          CompletedTodoos={CompletedTodoos}
          setCompletedTodoos={setCompletedTodoos}
        />
      </div>
    </DragDropContext>
  )
}

export default App
