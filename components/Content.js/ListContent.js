import classes from "./ListContent.module.css";

const ListContent = (props) => {
  return (
    <div className={classes.content}>
      <div className={classes.listarea}>
        <li className={classes.list}>
          <h3>{props.item}</h3>
          <h3>x {props.amount}</h3>
        </li>
      </div>
      <div className={classes.buttons}>
        <button>Edit</button>
        <button onClick={props.onDeleteItem.bind(this, props.id)}>Delete</button>
      </div>
    </div>
  );
};

export default ListContent;
