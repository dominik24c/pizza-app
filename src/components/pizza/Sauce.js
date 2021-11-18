import { ListItem, Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { addSauce } from '../../store/pizza/cart-reducer';
import SauceBtn from '../UI/SauceBtn';
import styles from './Sauce.module.css'; 

const Sauce = (props) =>{
    const dispatch = useDispatch();

    const addSauceHandler = () => {
        dispatch(addSauce(props.sauce));
    }
    return (
        <ListItem className={styles.Sauce + ' border_bottom'}>
            <Box display='flex' flexGrow={1}>
            <Box display='flex' flexGrow={1}>
                <p className={styles.Sauce__name}>{props.sauce.name}</p>
            </Box>
                <p className={styles.Sauce__price}>{props.sauce.price}$</p>
            </Box>
            <SauceBtn clickHandler={()=>addSauceHandler()}/>
        </ListItem>
    );
}

export default Sauce;
