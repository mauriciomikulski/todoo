import React, { useEffect, useRef } from "react";
import { Todoo } from "../../models/models";
import "../styles.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  index: number;
  todoo: Todoo,
  todoos: Array<Todoo>,
  setTodoos: React.Dispatch<React.SetStateAction<Array<Todoo>>>,
}


const SingleTodoo = ({ index, todoo, todoos, setTodoos }: Props) => {
  const [edit, setEdit] = React.useState<boolean>(false);
  const [todooEdit, setTodooEdit] = React.useState<string>(todoo.todoo);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodoos(todoos.map((todoo) => (todoo.id === id ? { ...todoo, todoo: todooEdit } : todoo))
    );
    setEdit(false);
  }
  const handleDelete = (id: number) => {
    setTodoos(todoos.filter((todoo) => todoo.id !== id));
  }
  const handleDone = (id: number) => {
    setTodoos(todoos.map((todoo) => todoo.id === id ? { ...todoo, isDone: !todoo.isDone } : todoo));
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Draggable draggableId={todoo.id.toString()} index={index}>
      {
        (provided, snapshot) => (
          <form
            className={`todos_single ${snapshot.isDragging ? "drag" : ""}`}
            onSubmit={(e) => handleEdit(e, todoo.id)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {
              edit ? (
                <input
                  ref={inputRef}
                  value={todooEdit}
                  onChange={(e) => setTodooEdit(e.target.value)}
                  className="todos_single--text"
                />
              ) : (
                todoo.isDone ? (
                  <s className="todos_single--text">{todoo.todoo}</s>
                ) : (
                  <span className="todos_single--text">{todoo.todoo}</span>
                )
              )
            }
            <div>
              <span className="icon" onClick={() => {
                if (!edit && !todoo.isDone) {
                  setEdit(true);
                }
              }}>
                <AiFillEdit />
              </span>
              <span className="icon" onClick={() => handleDelete(todoo.id)}>
                <AiFillDelete />
              </span>
              <span className="icon" onClick={() => handleDone(todoo.id)}>
                <MdDone />
              </span>
            </div>
          </form>
        )
      }
    </Draggable>
  );
};

export default SingleTodoo;