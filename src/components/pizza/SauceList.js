import { Box, CircularProgress, List } from "@material-ui/core";
import { useEffect } from "react";
import {useSelector,useDispatch} from 'react-redux';
import { fetchSauces } from "../../store/pizza/sauce-reducer";
import Error from "../errors/Error";
import SauceIcon from "../UI/SauceIcon";
import Title from "../UI/Title";
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
            {status==='loading' && <CircularProgress/>}
            {status==='success' && 
            <Box style={{display:'flex', justifyContent:'center'}}>
                <Title>Sauces</Title><SauceIcon/>
            </Box>}
            {status==='success' && renderSauces()}
            {status==='failed' && <Error/>}
        </List>
    );
}

export default SauceList;