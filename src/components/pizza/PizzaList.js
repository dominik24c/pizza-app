import { useState,useEffect,useCallback } from "react";
import Pizza from "./Pizza";

const PizzaList = () => {
    const [pizzas, setPizzas] = useState([]);

    const getPizzas = useCallback(async() =>{
        try{
            console.log(`${URL}/pizza`);
            const response = await fetch(`${URL}/pizza`,{
                method:'GET'
            });
            console.log(response);
    
            const data = await response.json();
            console.log(data);
            setPizzas(data);
        }catch(error){
            console.log(error);
        }

    });

    const renderPizzas = () => {
        return pizzas.map(pizza=>{
            return <Pizza key={pizza.id}
                          name={pizza.name}
                          price={pizza.price}/>
        })

    };

    useEffect(()=>{
        getPizzas();
    },[])

    return (
        <div id="pizza-list">
            {renderPizzas()}
        </div>
    );
}

export default PizzaList;