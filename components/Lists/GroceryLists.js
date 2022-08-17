import ListContent from "../Content.js/ListContent";
import ListHeader from "../Content.js/ListHeader";
import AllLists from "./AllLists";
import { useState } from "react";

import { getAuth } from "firebase/auth";

import classes from "./GroceryLists.module.css";
import AddContent from "../Content.js/AddContent";

const GroceryLists = (props) => {
  const auth = getAuth();
  const userId = auth.currentUser.uid;
  const [lists, setLists] = useState([]);
  const [openedListState, setOpenedListState] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const [listDate, setListDate] = useState("");
  const [listIdNo, setListIdNo] = useState("");

  const openListHandler = async (listId) => {
    setOpenedListState(true);

    try {
      const response = await fetch(
        `https://portfolio-groceries-default-rtdb.asia-southeast1.firebasedatabase.app/lists/${userId}/${listId}/list.json`
      );
      if (!response.ok) {
        throw new Error("Something went wrong when retrieving data!");
      }

      const data = await response.json();

      const listContent = [];

      setListTitle(data.title);
      setListDate(data.dateCreated);
      setListIdNo(listId);

      for (const key in data.content) {
        listContent.push({
          id: key,
          item: data.content[key].content.name,
          amount: data.content[key].content.amount,
        });
      }
      setLists(listContent);
    } catch (error) {
      alert(error.message);
    }
  };

  const addItemHandler = async (newContent) => {
    console.log("List ID " + listIdNo);
    const response = await fetch(
      `https://portfolio-groceries-default-rtdb.asia-southeast1.firebasedatabase.app/lists/${userId}/${listIdNo}/list/content.json`,
      {
        method: "POST",
        body: JSON.stringify({ content: newContent }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not create item.");
    }

    openListHandler();

    return null;
  };

  return (
    <div className={classes.blocks}>
      <div className={classes.sidebar}>
        <AllLists onOpenList={openListHandler} />
      </div>
      {openedListState && (
        <section className={classes.listcontent}>
          <div className={classes.listheader}>
            <div className={classes.content}>
              <ListHeader title={listTitle} dateCreated={listDate} />
              {lists.length === 0 ? (
                <p>There's nothing in here!</p>
              ) : (
                lists.map((list) => (
                  <ListContent item={list.item} amount={list.amount} />
                ))
              )}
            </div>
          </div>
          <div>
            <AddContent onAddItem={addItemHandler} />
          </div>
        </section>
      )}
    </div>
  );
};

export default GroceryLists;
