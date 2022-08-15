import classes from './List.module.css';

const List = (props) => {
    return (
        <li className={classes.list}>
            <h3>{props.title}</h3>
            <h4>{props.dateCreated}</h4>
        </li>
    )
};

export default List;