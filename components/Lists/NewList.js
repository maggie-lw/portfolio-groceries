import { useState, useRef } from "react";

import classes from './NewList.module.css';

const date = new Date();
const currentDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

const NewList = (props) => {
  const [createList, setCreateList] = useState(false);
  const listTitleInputRef = useRef();

  const toggleCreateList = () => {
    setCreateList(!createList);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const newList = {
        id: props.id,
        title: listTitleInputRef.current.value,
        dateCreated: currentDate,
    };
    setCreateList(!createList);
    props.onAddList(newList);
  };

  return (
    <div>
      {createList && (
        <div>
          <form onSubmit={submitHandler}>
            <div className={classes.control}>
              <label htmlFor="new-list-title">List Title: </label>
              <input id="new-list-title" ref={listTitleInputRef} />
            </div>
            <div className={classes.control}>
              <button>Create</button>
            </div>
          </form>
        </div>
      )}
      <div className={classes.control}>
        <button onClick={toggleCreateList}>
          {!createList ? "Add" : "Cancel"}
        </button>
      </div>
    </div>
  );
};

export default NewList;
