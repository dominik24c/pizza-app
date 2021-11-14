import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchIngredients, filterIngredients } from "../../store/pizza/ingredient-reducer";
import Ingredient from "./Ingredient";

const PizzaDetail = (props) => {
    const pizza = useSelector(state => state.pizza.selectedPizza)
    const ingredients = useSelector(state => state.ingredient.ingredients)
    const ingredientsOfPizza = useSelector(state => state.ingredient.ingredientsOfPizza)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchIngredients());
    }, [dispatch]);

    useEffect(()=>{
        dispatch(filterIngredients(pizza.ingredients));
    },[ingredients, pizza.ingredients, dispatch])

    const renderIngredients = () => {
        return ingredientsOfPizza.map(ingredient =>{
            return <Ingredient 
                    key={ingredient.id}
                    name={ingredient.name}
                    price={ingredient.price}
             />
        })
    }
    return (
        <>
            <h3>{pizza.name}</h3>
            <p><b>{pizza.price}$</b></p>
            <p>Ingredients:</p>
            <ol>
                {renderIngredients()}
            </ol>
        </>
    );
}

export default PizzaDetail;