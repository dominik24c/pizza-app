const Sauce = (props) =>{
    return (
        <div className="sauce">
            <h3>{props.name}</h3>
            <p>Price: <b>{props.price}</b></p>
        </div>
    );
}

export default Sauce;
