import { useEffect, useCallback, useState } from "react";
import Sauce from "./Sauce";

const SauceList = ()=>{
    const [sauces, setSauces] =useState([]);

    const getSauces = useCallback(async() => {
        try{
            const response = await fetch(`${URL}/sauce`);
            const data = await response.json();
            console.log(data);
            setSauces(data);
        }catch(error){
            console.log(error);
        }
    });

    const renderSauces = () =>{
        return sauces.map(sauce=>{
            return <Sauce 
                    key={sauce.id} 
                    name={sauce.name} 
                    price={sauce.price}
            />
        });
    };

    useEffect(()=>{
        getSauces();
    },[]);

    return (
        <>
        <h2>Sauces</h2>
        {sauces && 
            <div id="sauces">
                {renderSauces()}
            </div>
        }
        </>
    );
}

export default SauceList;