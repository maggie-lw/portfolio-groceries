import classes from "./AllLists.module.css";

import { useState } from "react";
import { getAuth } from "firebase/auth";

import { Fragment, useEffect } from "react";
import NewList from "./NewList";
import List from "./List";

const AllLists = () => {
  const auth = getAuth();
  const username = auth.currentUser.displayName;
  const userId = auth.currentUser.uid;
  const [lists, setLists] = useState([]);

  const addListHandler = async (newList) => {
    const response = await fetch(
      `https://portfolio-groceries-default-rtdb.asia-southeast1.firebasedatabase.app/lists/${userId}.json`,
      {
        method: "POST",
        body: JSON.stringify({ list: newList }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not create list.");
    }

    return null;
  };

  const fetchListHandler = async () => {
    try {
      const response = await fetch(
        `https://portfolio-groceries-default-rtdb.asia-southeast1.firebasedatabase.app/lists/${userId}.json`
      );
      if (!response.ok) {
        throw new Error("Something went wrong when retrieving data!");
      }

      const data = await response.json();

      const listData = [];

      for (const key in data) {
        listData.push({
          id: key,
          title: data[key].list.title,
          dateCreated: data[key].list.dateCreated,
        });
      }
      setLists(listData);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchListHandler();
  }, [fetchListHandler]);

  return (
    <Fragment>
      <div className={classes.blocks}>
        <section className={classes.sidebar}>
          <section className={classes.user}>
            <p>Welcome, </p>
            <h1>{username}!</h1>
          </section>
          <section className={classes.list}>
            <h1>List of lists</h1>
            <NewList onAddList={addListHandler} />
            <ul>
              {lists.map((list) => (
                <List
                  key={list.id}
                  title={list.title}
                  dateCreated={list.dateCreated}
                />
              ))}
            </ul>
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
