import { Fragment, useEffect } from "react";
import { useState } from "react";
import { getAuth } from "firebase/auth";


import NewList from "./NewList";
import List from "./List";
import LoadingSpinner from "../Layout/LoadingSpinner";

import classes from "./AllLists.module.css";

const AllLists = (props) => {
  const auth = getAuth();
  const username = auth.currentUser.displayName;
  const userId = auth.currentUser.uid;

  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // -------------------------------- Fetch all lists from DB. ----------------------------------------

  const fetchListHandler = async () => {
    setIsLoading(true);

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
          key: key,
          title: data[key].list.title,
          dateCreated: data[key].list.dateCreated,
        });
      }
      setIsLoading(false);
      setLists(listData);
    } catch (error) {
      alert(error.message);
    }
  };

  // -------------------------------- useEffect fetches list on first render. -----------------------------

  useEffect(() => {
    fetchListHandler()
  }, []);

  // ------------------------------- Function to add a new list. ----------------------------------------

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

    fetchListHandler();
    return null;
  };

  // ---------------------------------- Function to delete a list. --------------------------------------

  const deleteListHandler = async (id) => {
    const response = await fetch(
      `https://portfolio-groceries-default-rtdb.asia-southeast1.firebasedatabase.app/lists/${userId}/${id}.json`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not delete list.");
    }

    fetchListHandler();
    props.onCloseList(false);
    return null;
  };

  return (
    <Fragment>
      <div>
        <section className={classes.user}>
          <p>Welcome, </p>
          <h1>{username}!</h1>
        </section>
        <section className={classes.list}>
          <h1>Your Lists</h1>
          <NewList onAddList={addListHandler} />
          {isLoading && <LoadingSpinner />}
          {!isLoading && (
          <ul>
            {lists.map((list) => (
              <div key={list.id}>
                <List
                  title={list.title}
                  dateCreated={list.dateCreated}
                />
                <div className={classes.controls}>
                  <button onClick={props.onOpenList.bind(this, list.id)}>Open</button>
                  <button onClick={deleteListHandler.bind(this, list.id)}>Delete</button>
                </div>
              </div>
            ))}
          </ul>)}
        </section>
      </div>
    </Fragment>
  );
};

export default AllLists;
