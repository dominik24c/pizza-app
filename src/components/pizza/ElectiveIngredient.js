import styles from './ElectiveIngredients.module.css';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Button, ListItem, Box } from '@material-ui/core';
import PrimaryButton from '../UI/PrimaryButton';

const ElectiveIngredient = (props) =>{    
    return (
        <ListItem className={styles.ingredient}>
            <Box display='flex' flexGrow={1}>
                {props.name}
            </Box>
            <b>{props.price}$</b>
            {props.isSelected && 
            <PrimaryButton isOutlined={true} onClickHandler={props.deleteIngredientHandler}>
                <RemoveIcon/>
            </PrimaryButton>}
            {!props.isSelected && 
            <PrimaryButton isOutlined={true} onClickHandler={props.addIngredientHandler}>
                <AddIcon/>
            </PrimaryButton>}
        </ListItem>
    )
}

export default ElectiveIngredient