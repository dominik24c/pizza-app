import styles from './ElectiveIngredients.module.css';

const ElectiveIngredient = (props) =>{    
    return (
        <div className={props.isSelected ? styles.ElectiveIngredients_selected: styles.ElectiveIngredients_unselected}>
            <p>{props.name}</p>
            <small>Price: <b>{props.price}</b></small>
            {props.isSelected && 
            <button type='button' onClick={props.deleteIngredientHandler}>-</button>}
            {!props.isSelected &&
             <button type='button' onClick={props.addIngredientHandler}>+</button>}
        </div>
    )
}

export default ElectiveIngredient