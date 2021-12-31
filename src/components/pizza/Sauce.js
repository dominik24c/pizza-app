import { ListItem, Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { addSauce } from '../../store/pizza/cart-reducer';
import PrimaryButton from '../UI/PrimaryButton';
import AddIcon from '@mui/icons-material/Add';
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
            <PrimaryButton 
                    isOutlined={true}
                    onClickHandler={addSauceHandler}
                >
                <AddIcon/>
            </PrimaryButton>
        </ListItem>
    );
}

export default Sauce;
