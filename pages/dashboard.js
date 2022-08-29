import { Fragment } from "react";
import GroceryList from "../components/Lists/GroceryLists";

const Dashboard = () => {
  return (
  <Fragment>
    <GroceryList />
  </Fragment>
  );
};

Dashboard.requireAuth = true;

export default Dashboard;
