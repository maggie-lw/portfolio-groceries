import { Fragment } from "react";
import GroceryList from "../components/Lists/GroceryLists";

const Lists = () => {
  return (
  <Fragment>
    <GroceryList />
  </Fragment>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
    },
  }
}

export default Lists;
