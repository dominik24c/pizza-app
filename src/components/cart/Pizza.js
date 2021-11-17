import { Button, TableCell, TableRow } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addPizzaById,deletePizzaById } from "../../store/pizza/cart-reducer";

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Pizza = (props) =>{
    const dispatch = useDispatch();

    const addPizza = () => {
        dispatch(addPizzaById(props.id));
    }   

    const deletePizza = () => {
        dispatch(deletePizzaById(props.id));
    }

    return (
        <TableRow>
            <TableCell>{props.name}</TableCell>
            <TableCell>{props.children}</TableCell>
            <TableCell>{props.totalAmount}</TableCell>
            <TableCell>{props.totalPrice}</TableCell>
            <TableCell>
                <Button type="button" onClick={addPizza}>
                    <AddIcon/>
                </Button>
                <Button type="button" onClick={deletePizza}>
                    <RemoveIcon/>
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default Pizza;