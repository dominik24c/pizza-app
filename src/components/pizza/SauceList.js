import { useEffect } from "react";
import {useSelector,useDispatch} from 'react-redux';
import { fetchSauces } from "../../store/pizza/sauce-reducer";
import Sauce from "./Sauce";

const SauceList = ()=>{
    const sauces =useSelector(state => state.sauce.sauces);
    const status =useSelector(state => state.sauce.status);
    const dispatch = useDispatch();

    const renderSauces = () =>{
        return sauces.map(sauce=>{
            return <Sauce 
                    key={sauce.id} 
                    sauce={sauce}
            />
        });
    };

    useEffect(()=>{
        dispatch(fetchSauces());
    },[dispatch]);

    return (
        <div id="sauces">
            <h2>Sauces</h2>
            {status==='loading' && <h2>Loading...</h2>}
            {status==='success' &&renderSauces()}
            {status==='failed' && <h2>Error! cannot connect to api!</h2>}
        </div>
    );
}

export default SauceList;