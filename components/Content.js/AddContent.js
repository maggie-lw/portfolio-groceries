import { useState } from "react";
import { useRef } from "react";

import classes from './AddContent.module.css';

const AddContent = (props) => {
  const [toggleAdd, setToggleAdd] = useState(false);
  const itemNameInputRef = useRef();
  const itemAmountInputRef = useRef();

  const toggleAddItem = () => {
    setToggleAdd(!toggleAdd);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const newContent = {
      id: props.id,
      name: itemNameInputRef.current.value,
      amount: itemAmountInputRef.current.value,
      checked: false,
    };

    setToggleAdd(!toggleAdd);
    props.onAddItem(newContent, props.listKey);
  };

  return (
    <div>
      {toggleAdd && (
        <form onSubmit={submitHandler} className={classes.form}>
          <div className={classes.formarea}>
            <label htmlFor="item-name">Item Name: </label>
            <input id="item-name" type="text" ref={itemNameInputRef} className={classes.nameinput} />
          </div>
          <div className={classes.formarea}>
            <label htmlFor="item-amount">Amount: </label>
            <input
              id={"amount"}
              type="number"
              min={1}
              step={1}
              defaultValue={1}
              ref={itemAmountInputRef}
              className={classes.amountinput}
            />
          </div>
          <div>
            <button>Add</button>
          </div>
        </form>
      )}
      <div className={classes.control}>
        <button onClick={toggleAddItem}>
          {toggleAdd ? "X" : "+ Add"}
        </button>
      </div>
    </div>
  );
};

export default AddContent;
