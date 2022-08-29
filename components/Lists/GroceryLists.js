import { useState } from "react";
import { getAuth } from "firebase/auth";

import AddContent from "../Content.js/AddContent";
import ListContent from "../Content.js/ListContent";
import ListHeader from "../Content.js/ListHeader";
import AllLists from "./AllLists";

import classes from "./GroceryLists.module.css";
import LoadingSpinner from "../Layout/LoadingSpinner";

const GroceryLists = (props) => {
  const auth = getAuth();
  const userId = auth.currentUser.uid;
  const [lists, setLists] = useState([]);
  const [openedListState, setOpenedListState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const [listDate, setListDate] = useState("");
  const [listIdNo, setListIdNo] = useState("");

  const openListHandler = async (listId) => {
    setOpenedListState(true);
    setIsLoading(true);

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
          checked: data.content[key].content.checked,
        });
      }
      setIsLoading(false);
      setLists(listContent);
    } catch (error) {
      alert(error.message);
    }
  };

  const fetchListHandler = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://portfolio-groceries-default-rtdb.asia-southeast1.firebasedatabase.app/lists/${userId}/${listIdNo}/list.json`
      );
      if (!response.ok) {
        throw new Error("Something went wrong when retrieving data!");
      }

      const data = await response.json();

      const listContent = [];

      for (const key in data.content) {
        listContent.push({
          id: key,
          key: key,
          item: data.content[key].content.name,
          amount: data.content[key].content.amount,
          checked: data.content[key].content.checked,
        });
      }
      setIsLoading(false);
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

    fetchListHandler();

    return null;
  };

  const editItemHandler = async (itemId, newAmount) => {
    const response = await fetch(
      `https://portfolio-groceries-default-rtdb.asia-southeast1.firebasedatabase.app/lists/${userId}/${listIdNo}/list/content/${itemId}/content.json`,
      {
        method: "PATCH",
        body: JSON.stringify({ amount: newAmount }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not update item amount.");
    }

    fetchListHandler();
    return null;
  };

  const completedItemHandler = async (itemId, checkedForCompletion) => {
    const response = await fetch(
      `https://portfolio-groceries-default-rtdb.asia-southeast1.firebasedatabase.app/lists/${userId}/${listIdNo}/list/content/${itemId}/content.json`,
      {
        method: "PATCH",
        body: JSON.stringify({ checked: checkedForCompletion }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not update completion of item.");
    }

    fetchListHandler();
    return null;
  };

  const deleteItemHandler = async (itemId) => {
    const response = await fetch(
      `https://portfolio-groceries-default-rtdb.asia-southeast1.firebasedatabase.app/lists/${userId}/${listIdNo}/list/content/${itemId}.json`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not delete item.");
    }

    fetchListHandler();
    return null;
  };

  return (
    <div className={classes.blocks}>
      <div className={classes.sidebar}>
        <AllLists onOpenList={openListHandler} onCloseList={setOpenedListState} />
      </div>
      {openedListState && isLoading && <LoadingSpinner />}
      {openedListState && !isLoading && (
        <section className={classes.listcontent}>
          <div className={classes.listheader}>
            <div className={classes.content}>
              <ListHeader title={listTitle} dateCreated={listDate} />
              <div>
                <AddContent onAddItem={addItemHandler} />
              </div>
              {lists.length === 0 ? (
                <p>There's nothing in here!</p>
              ) : (
                lists.map((list) => (
                  <ListContent
                    id={list.id}
                    item={list.item}
                    amount={list.amount}
                    checked={list.checked}
                    onEditItem={editItemHandler}
                    onCompleteItem={completedItemHandler}
                    onDeleteItem={deleteItemHandler}
                  />
                ))
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default GroceryLists;
