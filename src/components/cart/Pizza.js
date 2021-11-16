import { useDispatch } from "react-redux";
import { addPizzaById,deletePizzaById } from "../../store/pizza/cart-reducer";

const Pizza = (props) =>{
    const dispatch = useDispatch();

    const addPizza = () => {
        dispatch(addPizzaById(props.id));
    }   

    const deletePizza = () => {
        dispatch(deletePizzaById(props.id));
    }

    return (
        <div>
            <p>{props.name}</p>
            <p>Price: {props.totalPrice}</p>
            <p>Amount: {props.totalAmount}</p>
            {props.children}
            <button type="button" onClick={addPizza}>+</button>
            <button type="button" onClick={deletePizza}>-</button>
        </div>
    );
}

export default Pizza;