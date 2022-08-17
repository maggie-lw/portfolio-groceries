import classes from './ListHeader.module.css';

const ListHeader = (props) => {
  return (
    <div>
      <div className={classes.header}>
        <h1>{props.title}</h1>
        <h3>{props.dateCreated}</h3>
      </div>
    </div>
  );
};

export default ListHeader;
