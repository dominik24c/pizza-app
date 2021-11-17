import { List } from "@material-ui/core";
import { useEffect } from "react";
import {useSelector,useDispatch} from 'react-redux';
import { fetchSauces } from "../../store/pizza/sauce-reducer";
import Spinner from "../UI/Spinner";
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
        <List id="sauces">
            {status==='loading' && <Spinner/>}
            {status==='success' && <h2>Sauces</h2>}
            {status==='success' &&renderSauces()}
            {status==='failed' && <h2>Error! cannot connect to api!</h2>}
        </List>
    );
}

export default SauceList;