import { useState } from "react";
import { useRef } from "react";

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
    };

    setToggleAdd(!toggleAdd);
    props.onAddItem(newContent);
  };

  return (
    <div>
      {toggleAdd && (
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="item-name">Item Name</label>
            <input id="item-name" type="text" ref={itemNameInputRef} />
          </div>
          <div>
            <label htmlFor="item-amount"></label>
            <input
              id={"amount_"}
              type="number"
              min={1}
              step={1}
              defaultValue={1}
              ref={itemAmountInputRef}
            />
          </div>
          <div>
            <button>Add</button>
          </div>
        </form>
      )}
      <div>
        <button onClick={toggleAddItem}>
          {toggleAdd ? "Cancel" : "Add Items"}
        </button>
      </div>
    </div>
  );
};

export default AddContent;
