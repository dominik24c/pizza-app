import React, { useEffect } from "react";
import {useSelector,useDispatch } from 'react-redux';
import Pizza from "./Pizza";
import { fetchPizzas } from "../../store/pizza/pizza-reducer";
import PizzaDetail from "./PizzaDetail";
import { CircularProgress, Grid, List } from "@material-ui/core";
import Title from "../UI/Title";
import Error from "../errors/Error";

const PizzaList = () => {
    const pizzas = useSelector(state => state.pizza.pizzas);
    const status = useSelector(state=>state.pizza.status);
    const isShowPizzaDetail = useSelector(state => state.pizza.isShowPizzaDetail);

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
        return <CircularProgress/>;
    }

    if (status==='failed'){
        return <Error/>;
    }

    return (
        <div>
        <Grid container 
              spacing={1}
              >
        <Grid item xs={12} sm={12} md={6}>
            <div id="pizza-list">
                <Title>Menu: </Title>
                <List>
                    {renderPizzas()}
                </List>
            </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} >
        {isShowPizzaDetail && 
            <div id="pizza-detail">
                <PizzaDetail/>
            </div>
            }
        </Grid>
        </Grid>
        </div>
    );
}

export default PizzaList;