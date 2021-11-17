import { useEffect } from "react";
import {useSelector,useDispatch } from 'react-redux';
import Pizza from "./Pizza";
import { fetchPizzas } from "../../store/pizza/pizza-reducer";
import PizzaDetail from "./PizzaDetail";
import Spinner from "../UI/Spinner";
import { Grid, List } from "@material-ui/core";

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

    if (status==='loading'){
        return <Spinner/>;
    }

    if (status==='failed'){
        return <h2>Error! cannot connect to api!</h2>;
    }

    return (
        <Grid container 
              spacing={1}
              >
        <Grid item xs={6} >
            <div id="pizza-list">
                <h2>Menu: </h2>
                <List>
                    {renderPizzas()}
                </List>
            </div>
        </Grid>
        <Grid item xs={5} >
        {isShowPizzaDetail && 
            <div id="pizza-detail">
                <PizzaDetail/>
            </div>
            }
        </Grid>
        </Grid>

    );
}

export default PizzaList;