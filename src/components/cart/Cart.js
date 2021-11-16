import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { orderPizza, resetCart } from "../../store/pizza/cart-reducer";
import Pizza from "./Pizza";
import Sauce from "./Sauce";
import Spinner from "../UI/Spinner";
import PizzaWithIngredient from "./PizzaWithIngredient";

const Cart = ()=>{
    const pizzas = useSelector(state=>state.cart.pizzas);
    const pizzasWithChangedIngredients =
            useSelector(state=>state.cart.pizzasWithChangedIngredients);
    const sauces = useSelector(state=>state.cart.sauces);
    const totalPrice = useSelector(state=> state.cart.totalPrice)
    const status = useSelector(state=> state.cart.status)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const renderPizzas = () => {
        // console.log(pizzas);
        return pizzas.map(pizza=>{
            return <Pizza key={pizza.key}
                          id={pizza.key}
                          name={pizza.name}
                          totalAmount={pizza.totalAmount}
                          totalPrice={pizza.price*pizza.totalAmount}
                          />
        })
    };

    const renderPizzasWithChangedIngredients = () => {
        return pizzasWithChangedIngredients.map(pizza=>{
            return <PizzaWithIngredient
                          key={pizza.key}
                          id={pizza.key}
                          name={pizza.name}
                          totalAmount={pizza.totalAmount}
                          totalPrice={pizza.price*pizza.totalAmount}
                          ingredients={pizza.ingredients}
                          />
        })
    };

    const renderSauces = () => {
        return sauces.map(pizza=>{
            return <Sauce key={pizza.id}
                          id={pizza.id}
                          name={pizza.name}
                          totalAmount={pizza.totalAmount}
                          totalPrice={pizza.price*pizza.totalAmount}
                          />
        })
    }

    const orderPizzaHandler = () => {
        dispatch(orderPizza());
    }

    useEffect(() => {
        if(status === 'success'){
            //redirect
            dispatch(resetCart());
            navigate('/');
        }
    }, [status,navigate,dispatch]);

    if(pizzas.length===0 && sauces.length===0 &&
        pizzasWithChangedIngredients.length === 0){
        return <h1>Your Cart is empty!!!</h1>;
    }

    return (
        <>
            <h1>My cart:</h1>
            {sauces.length!==0 && pizzas.length===0 && 
            pizzasWithChangedIngredients.length===0 &&
            <h3>You have to add at least one pizza!</h3>}
            {pizzas.length>0 && pizzasWithChangedIngredients.length > 0
                &&<h3>Pizzas:</h3>}
            {renderPizzas()}
            {renderPizzasWithChangedIngredients()}
            {sauces.length>0 && <>
            <br/>
            <h3>Sauces:</h3>
            </>
            }
            {renderSauces()}

            <p>Total price: {totalPrice}$</p>
            {status ==='failed' && 
                <h4>Something went wrong! Try again or later!</h4>
            }
            { status === 'sending' && <Spinner/>}
            { status !== 'sending' && 
            <button type="button" onClick={orderPizzaHandler}>Order</button>
            }   
        </>
    );
}

export default Cart;