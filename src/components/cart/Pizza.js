import { ButtonGroup, TableCell, TableRow } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addPizzaById,deletePizzaById } from "../../store/pizza/cart-reducer";

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PrimaryButton from "../UI/PrimaryButton";

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
                <ButtonGroup>
                    <PrimaryButton isOutlined={true} onClickHandler={addPizza}>
                        <AddIcon/>
                    </PrimaryButton>
                    <PrimaryButton isOutlined={true} onClickHandler={deletePizza}>
                        <RemoveIcon/>
                    </PrimaryButton>
                </ButtonGroup>
            </TableCell>
        </TableRow>
    );
}

export default Pizza;