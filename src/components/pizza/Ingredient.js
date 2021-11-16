const Ingredient = (props) => {

    return (
        <div>
            <p>{props.name}</p>
            <small>Price: <b>{props.price}</b></small>
        </div>
    );
};

export default Ingredient;