import styles from './ElectiveIngredients.module.css';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Button, ListItem, Box } from '@material-ui/core';

const ElectiveIngredient = (props) =>{    
    return (
        <ListItem className={styles.ingredient}>
            <Box display='flex' flexGrow={1}>
                {props.name}
            </Box>
            <b>{props.price}$</b>
            {props.isSelected && 
            <Button className={styles.remove_btn} onClick={props.deleteIngredientHandler}>
                <RemoveIcon/>
            </Button>}
            {!props.isSelected && 
            <Button className={styles.add_btn} onClick={props.addIngredientHandler}>
                <AddIcon/>
            </Button>}
        </ListItem>
    )
}

export default ElectiveIngredient