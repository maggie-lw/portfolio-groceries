import { useEffect, useRef, useState } from "react";
import classes from "./ListContent.module.css";

const ListContent = (props) => {
  const [editItem, setEditItem] = useState(false);
  const editAmountInputRef = useRef();
  const [completed, setCompleted] = useState(props.checked);

  const toggleEditForm = () => {
    setEditItem(!editItem);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const newAmount = editAmountInputRef.current.value;
    setEditItem(false);
    props.onEditItem(props.id, newAmount, props.listKey);
  };

  const toggleCompletion = (event) => {
    setCompleted(event.target.checked);
    props.onCompleteItem(props.id, event.target.checked, props.listKey);
  };

  const deleteHandler = () => {

    props.onDeleteItem(props.id, props.listKey);
  };

  const listCompletionClasses = props.checked
    ? `${classes.list} ${classes.listcompleted}`
    : `${classes.list}`;

  return (
    <div className={classes.content}>
      <div className={classes.listarea}>
        <li className={listCompletionClasses}>
          <input
            type="checkbox"
            checked={props.checked}
            onChange={toggleCompletion}
          />
          <h3>{props.item}</h3>
          <h3>x {props.amount}</h3>
        </li>
      </div>
      <div className={classes.editform}>
        {editItem && (
          <form onSubmit={submitHandler}>
            <label>New amount: </label>
            <input
              type="number"
              ref={editAmountInputRef}
              id="amount"
              min={1}
              step={1}
              defaultValue={props.amount}
            />
            <div>
              <button>Save</button>
            </div>
          </form>
        )}
        <div className={classes.buttons}>
          {!completed && <button onClick={toggleEditForm}>
            {editItem ? "Cancel" : "Edit"}
          </button>}
          {!editItem && (
            <button onClick={deleteHandler}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListContent;
