const Pizza = (props) => {
    return (
        <div>
            <h3>{props.name}</h3>
            <p><b>{props.price}$</b></p>
        </div>
    );
}

export default Pizza;