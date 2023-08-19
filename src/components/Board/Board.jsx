import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./Board.css";
import { MoreHorizontal } from "react-feather";
import Editable from "../Editable/Editable";
import Dropdown from "../Dropdown/Dropdown";
import { Droppable } from "react-beautiful-dnd";


export default function Board(props) {
  const [show, setShow] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (e.code === "Enter") setShow(false);
    });
    return () => {
      document.removeEventListener("keypress", (e) => {
        if (e.code === "Enter") setShow(false);
      });
    };
  });

  // useEffect(() => {
  //   console.log(props)
  // }, [props])

  return (
    <div className="board">
      <div className="board__top">
        {show ? (
          <div>
            <input
              className="title__input"
              type={"text"}
              defaultValue={props.name}
              onChange={(e) => {
                props.setName(e.target.value, props.id);
              }}
            />
          </div>
        ) : (
          <div>
            <p
              onClick={() => {
                setShow(true);
              }}
              className="board__title"
            >
              {props?.name || "Name of Board"}
              <span className="total__cards">{props.card?.length}</span>
            </p>
          </div>
        )}

        {/* <div
          onClick={() => {
            setDropdown(!dropdown);
          }}
        >
          <MoreHorizontal />
          {dropdown && (
            <Dropdown
              pos="right"
              className="board__dropdown"
              dropdown={dropdown}
              onClose={() => {
                setDropdown(false);
              }}
            >
              <p onClick={() => props.removeBoard(props.id)}>Delete Board</p>
            </Dropdown>
          )}
        </div> */}
      </div>

      <Droppable droppableId={props.id.toString()}>
        {(provided) => (
          <div
            className="board__cards"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >

            {props.card?.map((item, index) => (
              <Card
                bid={props.id}
                index={index}
                key={item.id}
                id={item.id}
                title={item.title}
                tag={item.tag}
                priority={item.priority}
                availability={item.availability}
                userId={item.userId}
                updateCard={props.updateCard}
                removeCard={props.removeCard}
                card={item}
              />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="board__footer">
        <Editable
          name={"Add Card"}
          btnName={"Add Card"}
          placeholder={"Enter Card Title"}
          onSubmit={(value) => props.addCard(value, props.id)}
        />
      </div>
    </div>
  );
}