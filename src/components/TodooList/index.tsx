import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todoo } from "../../models/models";
import SingleTodoo from "../SingleTodoo";
import "../styles.css";

interface props {
  todoos: Array<Todoo>;
  setTodoos: React.Dispatch<React.SetStateAction<Array<Todoo>>>;
  setCompletedTodoos: React.Dispatch<React.SetStateAction<Array<Todoo>>>;
  CompletedTodoos: Array<Todoo>;
}

const TodooList: React.FC<props> = ({ todoos, setTodoos, setCompletedTodoos, CompletedTodoos }) => {
  return (
    <div className="container">
      <Droppable droppableId={"TodoosList"} type={"droppableList"} mode="standard">
        {
          (provided, snapshot) => (
            <div className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos_heading">Active Tasks</span>
              {
                todoos?.map((todoo, index) => (
                  <SingleTodoo
                    index={index}
                    key={todoo.id}
                    todoo={todoo}
                    todoos={todoos}
                    setTodoos={setTodoos}
                  />
                ))
              }
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
      <Droppable droppableId={"TodoosRemove"} type={"droppableList"} mode="standard">
        {
          (provided, snapshot) => (
            <div className={`todos remove ${snapshot.isDraggingOver ? "dragcomplete" : ""}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos_heading">Completed Tasks</span>
              {
                CompletedTodoos?.map((todoo, index) => (
                  <SingleTodoo
                    index={index}
                    key={todoo.id}
                    todoo={todoo}
                    todoos={CompletedTodoos}
                    setTodoos={setCompletedTodoos}
                  />
                ))
              }
              {provided.placeholder}
            </div>
          )
        }

      </Droppable >
    </div>
  );
}

export default TodooList;