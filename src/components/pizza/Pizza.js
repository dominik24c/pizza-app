import { useDispatch } from 'react-redux';
import { showPizzaDetail } from '../../store/pizza/pizza-reducer';
import { addPizza } from '../../store/pizza/cart-reducer'; 
import { Box, ButtonGroup, ListItem } from '@material-ui/core';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import AddIcon from '@mui/icons-material/Add';
import PrimaryButton from '../UI/PrimaryButton';

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
            <ButtonGroup>
                <PrimaryButton 
                    isOutlined={true}
                    onClickHandler={addPizzaHandler}
                >
                    <AddIcon/>
                </PrimaryButton>
                <PrimaryButton 
                    isOutlined={true}
                    onClickHandler={showPizzaDetailHandler}
                >
                    <ReadMoreIcon/>
                </PrimaryButton>
            </ButtonGroup>
        </ListItem>
    );
}

export default Pizza;