import { Fragment } from "react";
import GroceryList from "../components/Lists/GroceryLists";

const Lists = () => {
  return (
  <Fragment>
    <GroceryList />
  </Fragment>
  );
};

Lists.requireAuth = true;

export default Lists;
