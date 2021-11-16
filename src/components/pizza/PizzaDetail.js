import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPizzaWithChangedIngredients } from "../../store/pizza/cart-reducer";
import { addIngredient, deleteIngredient, fetchIngredients, filterIngredients, setPriceOfPizza } from "../../store/pizza/ingredient-reducer";
import Spinner from "../UI/Spinner";
import ElectiveIngredient from "./ElectiveIngredient";
import Ingredient from "./Ingredient";

const PizzaDetail = (props) => {
    const [isPizzaEdited, setIsPizzaEdited] = useState(false);

    const orginalPizzas = useSelector(state=>state.pizza.pizzas);
    const pizza = useSelector(state => state.pizza.selectedPizza);
    const ingredients = useSelector(state => state.ingredient.ingredients);
    const choosenIngredientOfPizza = useSelector(state => state.ingredient.choosenIngredientOfPizza)
    const price =useSelector(state=>state.ingredient.priceOfPizza)
    const status = useSelector(state=>state.ingredient.status);

    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(fetchIngredients());
    }, [dispatch]);

    useEffect(()=>{
        dispatch(filterIngredients(pizza.ingredients));
        dispatch(setPriceOfPizza(pizza.price));
    },[ingredients, pizza.ingredients, dispatch])

    const renderIngredients = () => {
        return choosenIngredientOfPizza.map(ingredient =>{
            return <Ingredient 
                    key={ingredient.id}
                    name={ingredient.name}
                    price={ingredient.price}
             />
        })
    }
    const addPizza = () => {
        console.log(pizza);
        const pizzaObj = {
            id: pizza.id,
            name: pizza.name,
            price,
            ingredients:choosenIngredientOfPizza
        }

        dispatch(addPizzaWithChangedIngredients({pizzaObj,orginalPizzas}));
    };

    const editPizza = () =>{
        setIsPizzaEdited(true);
    }
    const hideEditedIngredients = () =>{
        setIsPizzaEdited(false);
    }

    const addIngredientHandler = (ingredient) =>{
        console.log(ingredient);
        dispatch(addIngredient(ingredient));
    }

    const deleteIngredientHandler = (id) => {
        console.log(id)
        dispatch(deleteIngredient(id));
    }

    const renderIngredientsToEdit = () =>{
        const idsOfIngredients = choosenIngredientOfPizza.map(i=>i.id);
        // console.log(choosenIngredients)
        return ingredients.map(ingredient =>{
            const id = ingredient.id;
            // console.log(idsOfIngredients.includes(id));
            return <ElectiveIngredient 
                    key={id}
                    id={id}
                    isSelected={idsOfIngredients.includes(id)}
                    name={ingredient.name}
                    price={ingredient.price}
                    addIngredientHandler={addIngredientHandler.bind(this,ingredient)}
                    deleteIngredientHandler={deleteIngredientHandler.bind(this,id)}
             />
        })
    }

    return (
        <>
            <h3>{pizza.name}</h3>
            <p><b>{price}$</b></p>
            {status==='loading' && <Spinner/>}
            {!isPizzaEdited && status==='success' && <p>Ingredients:</p>}
            {!isPizzaEdited && renderIngredients()}
            {!isPizzaEdited && status==='success' && <button type="button" onClick={addPizza}>+</button>}
            {!isPizzaEdited && status==='success'&& <button type="button" onClick={editPizza}>Edit Pizza</button>}
            {isPizzaEdited && renderIngredientsToEdit()}
            {isPizzaEdited && <button type="button" onClick={hideEditedIngredients}>Hide edited ingredients</button>}
        </>
    );
}

export default PizzaDetail;