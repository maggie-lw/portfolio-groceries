import ListContent from "../Content.js/ListContent";
import AllLists from "./AllLists";

import classes from "./GroceryLists.module.css";

const GroceryList = () => {
  return (
    <div className={classes.blocks}>
      <div className={classes.sidebar}>
        <AllLists />
      </div>
      <section className={classes.listcontent}>
        <ListContent />
      </section>
    </div>
  );
};

export default GroceryList;
