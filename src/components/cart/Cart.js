import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { orderPizza, resetCart } from "../../store/pizza/cart-reducer";
import Pizza from "./Pizza";
import Sauce from "./Sauce";
import Spinner from "../UI/Spinner";
import PizzaWithIngredient from "./PizzaWithIngredient";
import { Button, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Table } from "@material-ui/core";
import './Cart.css';

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

    const isPizzaInIngredient = () => {
        return pizzas.length>0 || pizzasWithChangedIngredients.length > 0;
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

    const renderPizzaTable = ()=>{
        return (
            <TableContainer component={Paper}>
                <Table sx={{minWidth:650}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Pizza</TableCell>
                            <TableCell>Ingredients</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderPizzas()}
                        {renderPizzasWithChangedIngredients()}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    const renderSauceTable = () =>{
        return (
            <TableContainer component={Paper}>
                <Table sx={{minWidth:650}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Sauce</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderSauces()}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    let btnStyle = 'btn';
    if(pizzas.length===0 && pizzasWithChangedIngredients.length===0){
        btnStyle+=' btn-disabled'
    }

    return (
        <>
            <h1>My cart:</h1>
            {sauces.length!==0 && pizzas.length===0 && 
            pizzasWithChangedIngredients.length===0 &&
            <h3>You have to add at least one pizza!</h3>}
            {isPizzaInIngredient() &&<h3>Pizzas:</h3>}
            {isPizzaInIngredient() && renderPizzaTable()}
            {sauces.length>0 && <><br/><h3>Sauces:</h3></>}
            {sauces.length>0 && renderSauceTable()}

            <p className="price">Total price: <b>{totalPrice}$</b></p>
            {status ==='failed' && 
                <h4>Something went wrong! Try again or later!</h4>
            }
            { status === 'sending' && <Spinner/>}
            { status !== 'sending' && 
            <Button className={btnStyle} onClick={orderPizzaHandler}>Order</Button>
            }   
        </>
    );
}

export default Cart;