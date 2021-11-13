import { useState,useCallback,useEffect } from "react";
import Ingredient from "./Ingredient";

const PizzaDetail = (props) => {
    const [pizza, setPizza] = useState({});
    const [ingredients, setIngredients] = useState([]);

    setPizza({
        "id":props.pizza.id,
        "name":props.pizza.name,
        "price":props.pizza.price,
        "ingredients":props.pizza.ingredients.slice()
    });

    const getIngredients = useCallback(async()=>{
        try{
            const response = await fetch(`${URL}/ingredient`);
            const data = await response.json();
            const filteredIngredients = data.filter((ingredient)=>{
                return ingredient.id.includes(pizza.ingredients);
            })
            setIngredients(filteredIngredients);
        }catch(error){
            console.log(error);
        }
        setIngredients()
    });

    useEffect(()=>{
        getIngredients();
    }, [ingredients,getIngredients]);

    const renderIngredients = () => {
        return ingredients.map(ingredient =>{
            return <Ingredient 
            key={ingredient.id}
             name={ingredient.name}
             price={ingredient.price}
             />
        })
    }
    return (
        <>
            <h3>{props.name}</h3>
            <p><b>{props.price}$</b></p>
            <p>Ingredients:</p>
            <ol>
                {renderIngredients()}
            </ol>
        </>
    );
}

export default PizzaDetail;