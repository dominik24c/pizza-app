import { useDispatch, useSelector } from "react-redux";
import Pizza from "./Pizza";
import Sauce from "./Sauce";

const Cart = ()=>{
    const pizzas = useSelector(state=>state.cart.pizzas);
    const sauces = useSelector(state=>state.cart.sauces);
    const totalPrice = useSelector(state=> state.cart.totalPrice)

    // const dispatch = useDispatch();

    const renderPizzas = () => {
        console.log(pizzas);
        return pizzas.map(pizza=>{
            return <Pizza key={pizza.id}
                          id={pizza.id}
                          name={pizza.name}
                          totalAmount={pizza.totalAmount}
                          totalPrice={pizza.price*pizza.totalAmount}
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

    if(pizzas.length===0 && sauces.length===0){
        return <h1>Your Cart is empty!!!</h1>;
    }

    return (
        <>
            <h1>My cart:</h1>
            {pizzas.length>0 &&<h3>Pizzas:</h3>}
            {renderPizzas()}
            {sauces.length>0 && <>
            <br/>
            <h3>Sauces:</h3>
            </>
            }
            {renderSauces()}

            <p>Total price: {totalPrice}$</p>

            <button type="button" >Order</button>
        </>
    );
}

export default Cart;