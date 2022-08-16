import classes from './ListContent.module.css';

const ListContent = (props) => {
  return (
    <div className={classes.content}>
      <div className={classes.header}>
        <h1>{props.title}</h1>
        <h3>{props.dateCreated}</h3>
      </div>
      <div>
        <p>{props.content}</p>
      </div>
    </div>
  );
};

export default ListContent;
