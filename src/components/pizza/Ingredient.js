const Ingredient = (props) => {

    return (
        <>
            <p>{props.name}</p>
            <small>Price: <b>{props.price}</b></small>
        </>
    );
};

export default Ingredient;