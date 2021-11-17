import { useDispatch } from 'react-redux';
import { showPizzaDetail } from '../../store/pizza/pizza-reducer';
import { addPizza } from '../../store/pizza/cart-reducer'; 
// import pizzaImg from '../../img/pizza-btn.png';
// import detailImg from '../../img/show-detail.png';
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
        <ListItem>
            <Box display='flex' flexGrow={1}>
            <Box display='flex' flexGrow={1}>
                <p>{props.pizza.name}</p> 
            </Box>
            <p><b>{props.pizza.price}$</b></p>
            <Button onClick={addPizzaHandler}>
                <AddIcon/>
            </Button>
            <Button onClick={showPizzaDetailHandler}>
                <ReadMoreIcon/>
            </Button>
            </Box>
        </ListItem>
    );
}

export default Pizza;