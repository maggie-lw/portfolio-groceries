import classes from "./ListContent.module.css";

const ListContent = (props) => {
  return (
    <div>
      <li className={classes.list}>
        <h3>{props.item}</h3>
        <h3>x {props.amount}</h3>
      </li>
    </div>
  );
};

export default ListContent;
