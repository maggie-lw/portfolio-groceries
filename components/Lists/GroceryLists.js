import ListContent from "../Content.js/ListContent";
import AllLists from "./AllLists";
import { useState } from "react";

import { getAuth } from "firebase/auth";

import classes from "./GroceryLists.module.css";

const GroceryLists = () => {
  const auth = getAuth();
  const userId = auth.currentUser.uid;
  const [lists, setLists] = useState([]);
  const [openedListState, setOpenedListState] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const [listDate, setListDate] =  useState("");

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

      for (const key in data.content) {
        listContent.push({
          item: data.content[key].item,
          amount: data.content[key].amount,
        });
      }
      setLists(listContent);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={classes.blocks}>
      <div className={classes.sidebar}>
        <AllLists onOpenList={openListHandler} />
      </div>
      {openedListState && (
        <section className={classes.listcontent}>
          <div className={classes.listheader}>
            {lists.length === 0 && <ListContent title={listTitle} dateCreated={listDate} />}
            {lists.length === 0 && <p>There's nothing in here!</p>}
            {lists.length > 0 && <ListContent title={listTitle} dateCreated={listDate} content={lists} />}
          </div>
          <div>
            <button>Add Items</button>
          </div>
        </section>
      )}
    </div>
  );
};

export default GroceryLists;
