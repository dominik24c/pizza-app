import { ButtonGroup, TableCell, TableRow } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addSauceById,deleteSauceById } from "../../store/pizza/cart-reducer";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PrimaryButton from "../UI/PrimaryButton";

const Sauce = (props) =>{
    const dispatch = useDispatch();

    const addSauce = () => {
        dispatch(addSauceById(props.id));
    }   

    const deleteSauce = () => {
        dispatch(deleteSauceById(props.id));
    }

    return (
        <TableRow>
            <TableCell>{props.name}</TableCell>
            <TableCell>{props.totalAmount}</TableCell>
            <TableCell>{props.totalPrice}</TableCell>
            <TableCell>
                <ButtonGroup >
                    <PrimaryButton isOutlined={true} onClickHandler={addSauce}>
                        <AddIcon/>
                    </PrimaryButton>
                    <PrimaryButton isOutlined={true} onClickHandler={deleteSauce}>
                        <RemoveIcon/>
                    </PrimaryButton>
                </ButtonGroup>
            </TableCell>
        </TableRow>
    );
}

export default Sauce;