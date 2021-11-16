import { useEffect } from "react";
import {useSelector,useDispatch } from 'react-redux';
import Pizza from "./Pizza";
import { fetchPizzas } from "../../store/pizza/pizza-reducer";
import PizzaDetail from "./PizzaDetail";
import Spinner from "../UI/Spinner";

const PizzaList = () => {
    const pizzas = useSelector(state => state.pizza.pizzas);
    const status = useSelector(state=>state.pizza.status);
    const isShowPizzaDetail = useSelector(state => state.pizza.isShowPizzaDetail)

    const dispatch = useDispatch();

    const renderPizzas = () => {
        return pizzas.map(pizza=>{
            return <Pizza key={pizza.id}
                          pizza={pizza}/>
        });

    };

    useEffect(()=>{
        dispatch(fetchPizzas());
    },[dispatch]);

    return (
        <>
        <div id="pizza-list">
            {status==='loading' && <Spinner/>}
            {status==='success' && <h2>Menu: </h2>}
            {status==='success' && renderPizzas()}
            {status==='failed' && <h2>Error! cannot connect to api!</h2>}
        </div>
        {status!=='loading' && isShowPizzaDetail && 
            <div id="pizza-detail">
                <PizzaDetail/>
            </div>
            }
        </>

    );
}

export default PizzaList;