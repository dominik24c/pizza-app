import { Button, TableCell, TableRow } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addSauceById,deleteSauceById } from "../../store/pizza/cart-reducer";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Sauce = (props) =>{
    const dispatch = useDispatch();

    const addPizza = () => {
        dispatch(addSauceById(props.id));
    }   

    const deletePizza = () => {
        dispatch(deleteSauceById(props.id));
    }

    return (
        <TableRow>
            <TableCell>{props.name}</TableCell>
            <TableCell>{props.totalAmount}</TableCell>
            <TableCell>{props.totalPrice}</TableCell>
            <TableCell>
                <Button onClick={addPizza}>
                    <AddIcon/>
                </Button>
                <Button onClick={deletePizza}>
                    <RemoveIcon/>
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default Sauce;