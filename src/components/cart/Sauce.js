import { useDispatch } from "react-redux";
import { addSauceById,deleteSauceById } from "../../store/pizza/cart-reducer";

const Sauce = (props) =>{
    const dispatch = useDispatch();

    const addPizza = () => {
        dispatch(addSauceById(props.id));
    }   

    const deletePizza = () => {
        dispatch(deleteSauceById(props.id));
    }

    return (
        <div>
            <p>{props.name}</p>
            <p>Price: {props.totalPrice}</p>
            <p>Amount: {props.totalAmount}</p>
            <button type="button" onClick={addPizza}>+</button>
            <button type="button" onClick={deletePizza}>-</button>
        </div>
    );
}

export default Sauce;