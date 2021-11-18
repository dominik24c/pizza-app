import { useDispatch } from 'react-redux';
import { showPizzaDetail } from '../../store/pizza/pizza-reducer';
import { addPizza } from '../../store/pizza/cart-reducer'; 
import { Box, Button, ListItem } from '@material-ui/core';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import AddIcon from '@mui/icons-material/Add';

const Pizza = (props) => {
    const dispatch = useDispatch()
    const showPizzaDetailHandler = () => {
        dispatch(showPizzaDetail(props.pizza.id));
    }

    const addPizzaHandler = () => {
        dispatch(addPizza(props.pizza));
    }

    return (
        <ListItem className='border_bottom'>
            <Box display='flex' flexGrow={1}>
            <Box display='flex' flexGrow={1}>
                {props.pizza.name}
            </Box>
            <b>{props.pizza.price}$</b>
            </Box>
            <Button onClick={addPizzaHandler}>
                <AddIcon/>
            </Button>
            <Button onClick={showPizzaDetailHandler}>
                <ReadMoreIcon/>
            </Button>
        </ListItem>
    );
}

export default Pizza;