import { useEffect } from "react";
import {useSelector,useDispatch } from 'react-redux';
import Pizza from "./Pizza";
import { fetchPizzas } from "../../store/pizza/pizza-reducer";
import PizzaDetail from "./PizzaDetail";

const PizzaList = () => {
    const pizzas = useSelector(state => state.pizza.pizzas);
    const status = useSelector(state=>state.pizza.status);
    const isShowPizzaDetail = useSelector(state => state.pizza.isShowPizzaDetail)

    const dispatch = useDispatch();

    const renderPizzas = () => {
        return pizzas.map(pizza=>{
            return <Pizza key={pizza.id}
                          id={pizza.id}  
                          name={pizza.name}
                          price={pizza.price}/>
        });

    };

    useEffect(()=>{
        dispatch(fetchPizzas());
    },[dispatch])

    return (
        <>
        <div id="pizza-list">
            {status==='loading' && <h2>Loading...</h2>}
            {status==='success' &&renderPizzas()}
            {status==='failed' && <h2>Error! cannot connect to api!</h2>}
        </div>
        {isShowPizzaDetail && 
            <div id="pizza-detail">
                <PizzaDetail/>
            </div>
            }
        </>

    );
}

export default PizzaList;