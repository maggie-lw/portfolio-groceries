import { useRef, useState } from "react";
import classes from "./ListContent.module.css";

const ListContent = (props) => {
  const [editItem, setEditItem] = useState(false);
  const editAmountInputRef = useRef();
  const [isCompleted, setIsCompleted] = useState(false);

  const toggleEditForm = () => {
    setEditItem(!editItem);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const newAmount = editAmountInputRef.current.value;
    setEditItem(false);

    props.onEditItem(props.id, newAmount);
  };

  const toggleCompletion = (event) => {
    if (event.target.checked) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };

  const listCompletionClasses = isCompleted? `${classes.list} ${classes.listcompleted}` : `${classes.list}`;

  return (
    <div className={classes.content}>
      <div className={classes.listarea}>
        <li className={listCompletionClasses}>
          <input type="checkbox" value={isCompleted} onChange={toggleCompletion} />
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
          <button onClick={toggleEditForm}>
            {editItem ? "Cancel" : "Edit"}
          </button>
          {!editItem && (
            <button onClick={props.onDeleteItem.bind(this, props.id)}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListContent;
