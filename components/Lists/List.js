import { Fragment } from "react";
import classes from "./List.module.css";


const List = (props) => {

  return (
    <Fragment>
      <div>
        <li className={classes.list}>
          <h3>{props.title}</h3>
          <h4>{props.dateCreated}</h4>
        </li>
      </div>
    </Fragment>
  );
};

export default List;
