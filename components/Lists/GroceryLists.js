import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

import AddContent from "../Content.js/AddContent";
import ListContent from "../Content.js/ListContent";
import ListHeader from "../Content.js/ListHeader";
import AllLists from "./AllLists";

import classes from "./GroceryLists.module.css";

const GroceryLists = (props) => {
  const auth = getAuth();
  const userId = auth.currentUser.uid;

  const [openedListState, setOpenedListState] = useState(false);

  const [lists, setLists] = useState([]);
  const [listData, setListData] = useState({});

  // ------------------- Function to open a chosen list. ------------------------------------------------

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

      setListData({
        listKey: listId,
        title: data.title,
        dateCreated: data.dateCreated,
      });

      for (const key in data.content) {
        listContent.push({
          id: key,
          item: data.content[key].content.name,
          amount: data.content[key].content.amount,
          checked: data.content[key].content.checked,
        });
      }
      setLists(listContent);
    } catch (error) {
      alert(error.message);
    }
  };

  // ---------------------- Function to fetch and update data following a change. ------------------------

  const fetchListHandler = async (listKey) => {
    try {
      const response = await fetch(
        `https://portfolio-groceries-default-rtdb.asia-southeast1.firebasedatabase.app/lists/${userId}/${listKey}/list.json`
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
      setLists(listContent);
    } catch (error) {
      alert(error.message);
    }
  };

  // --------------------------- Function to add items into list. ------------------------------------

  const addItemHandler = async (newContent, listKey) => {
    const response = await fetch(
      `https://portfolio-groceries-default-rtdb.asia-southeast1.firebasedatabase.app/lists/${userId}/${listKey}/list/content.json`,
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

    fetchListHandler(listData.listKey);

    return null;
  };

  // ---------------------- Function to edit the amount of item in list. ------------------------------

  const editItemHandler = async (itemId, newAmount, listKey) => {
    const response = await fetch(
      `https://portfolio-groceries-default-rtdb.asia-southeast1.firebasedatabase.app/lists/${userId}/${listKey}/list/content/${itemId}/content.json`,
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

    fetchListHandler(listData.listKey);
    return null;
  };

  // ---------------------- Function to mark item as completed. ------------------------------------

  const completedItemHandler = async (itemId, checkedForCompletion, listKey) => {
    const response = await fetch(
      `https://portfolio-groceries-default-rtdb.asia-southeast1.firebasedatabase.app/lists/${userId}/${listKey}/list/content/${itemId}/content.json`,
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

    fetchListHandler(listData.listKey);
    return null;
  };

  // ---------------------------- Function to delete item off list. --------------------------------

  const deleteItemHandler = async (itemId, listKey) => {
    const response = await fetch(
      `https://portfolio-groceries-default-rtdb.asia-southeast1.firebasedatabase.app/lists/${userId}/${listKey}/list/content/${itemId}.json`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not delete item.");
    }

    fetchListHandler(listData.listKey);
    return null;
  };

  return (
    <div className={classes.blocks}>
      <div className={classes.sidebar}>
        <AllLists onOpenList={openListHandler} onCloseList={setOpenedListState} />
      </div>
      {openedListState && (
        <section className={classes.listcontent}>
          <div className={classes.listheader}>
            <div className={classes.content}>
              <ListHeader listKey={listData.listKey} title={listData.title} dateCreated={listData.dateCreated} />
              <div>
                <AddContent listKey={listData.listKey} onAddItem={addItemHandler} />
              </div>
              {lists.length === 0 ? (
                <p>There&apos;s nothing in here!</p>
              ) : (
                lists.map((list) => (
                  <ListContent
                    id={list.id}
                    key={list.id}
                    item={list.item}
                    amount={list.amount}
                    checked={list.checked}
                    listKey={listData.listKey}
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
