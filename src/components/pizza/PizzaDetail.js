import { CircularProgress } from "@material-ui/core";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPizzaWithChangedIngredients } from "../../store/pizza/cart-reducer";
import { addIngredient, deleteIngredient, fetchIngredients, filterIngredients, setPriceOfPizza } from "../../store/pizza/ingredient-reducer";
import PrimaryButton from "../UI/PrimaryButton";
import ElectiveIngredient from "./ElectiveIngredient";
import Ingredient from "./Ingredient";
import './PizzaDetail.css'

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
    },[ingredients, pizza.ingredients, pizza.price, dispatch])

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

    if(status==='loading'){
        return <CircularProgress/>;
    }

    return (
        <>
            <h3>{pizza.name} {price}$</h3>
            {!isPizzaEdited && status==='success' && <p>Ingredients:</p>}
            {!isPizzaEdited && renderIngredients()}
            {!isPizzaEdited && status==='success' && 
            <>
                <PrimaryButton onClickHandler={addPizza}><AddIcon/></PrimaryButton>
                <span className="btn_margin"></span>
                <PrimaryButton onClickHandler={editPizza}>Edit Pizza</PrimaryButton>
            </>}
            {isPizzaEdited && status==='success' && renderIngredientsToEdit()}
            {isPizzaEdited && <PrimaryButton onClickHandler={hideEditedIngredients}>Hide edited ingredients</PrimaryButton>}
        </>
    );
}

export default PizzaDetail;