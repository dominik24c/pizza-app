import { useDispatch } from "react-redux";
import { addSauceById,deleteSauceById } from "../../store/pizza/cart-reducer";
import ProductListItem from "../UI/ProductListItem";

const Sauce = (props) =>{
    const dispatch = useDispatch();

    const addSauce = () => {
        dispatch(addSauceById(props.id));
    }   

    const deleteSauce = () => {
        dispatch(deleteSauceById(props.id));
    }

    return (
        <ProductListItem
            addButtonHandler={addSauce}
            deleteButtonHandler={deleteSauce}
            >
            {`${props.name } - ${props.totalAmount}x ${props.totalPrice}$`}
        </ProductListItem>
    );
}


export default Sauce;