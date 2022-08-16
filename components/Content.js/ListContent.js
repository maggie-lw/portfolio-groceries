import classes from './ListContent.module.css';

const ListContent = (props) => {
  return (
    <div className={classes.content}>
      <div className={classes.header}>
        <h1>Title</h1>
        <h3>Date</h3>
      </div>
      <div>
        <p>List content</p>
      </div>
    </div>
  );
};

export default ListContent;
