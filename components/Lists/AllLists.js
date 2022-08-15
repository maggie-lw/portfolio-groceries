import classes from "./AllLists.module.css";

import { getAuth } from "firebase/auth";

import { Fragment } from "react";

const AllLists = () => {

    const auth = getAuth();
    const username = auth.currentUser.displayName;

  return (
    <Fragment>
      <div className={classes.blocks}>
        <section className={classes.sidebar}>
          <section className={classes.user}><p>Welcome, </p><h1>{username}!</h1></section>
          <section className={classes.list}>
            <h1>List of lists</h1>
          </section>
        </section>
        <section className={classes.listcontent}>
          <p>List content</p>
        </section>
      </div>
    </Fragment>
  );
};

export default AllLists;
