const Ingredient = (props) => {

    return (
        <li>
            <p>{props.name}</p>
            <small>Price: <b>{props.price}</b></small>
        </li>
    );
};

export default Ingredient;