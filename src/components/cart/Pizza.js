import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addPizzaById,deletePizzaById } from "../../store/pizza/cart-reducer";
import ProductListItem from "../UI/ProductListItem";

const Pizza = (props) =>{
    const dispatch = useDispatch();

    const addPizza = () => {
        dispatch(addPizzaById(props.id));
    }   

    const deletePizza = () => {
        dispatch(deletePizzaById(props.id));
    }

    return (
        <ProductListItem
            addButtonHandler={addPizza}
            deleteButtonHandler={deletePizza}
            >
            <Grid container>
                <Grid item xs={12}>
                    {`${props.name } - ${props.totalAmount}x ${props.totalPrice}$`}
                </Grid>
                <Grid item xs={12}>
                    {props.children}
                </Grid>
            </Grid>
        </ProductListItem>
    );
}

export default Pizza;