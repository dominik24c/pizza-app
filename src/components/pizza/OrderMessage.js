import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import ideliveryManImg from '../../img/deliveryman.png';
import { resetMessages } from '../../store/pizza/cart-reducer';
import { useLocation } from 'react-router-dom';

import './OrderMessage.css';

const OrderMessage = () => {
    const successMessage = useSelector(state => state.cart.successMessage);
    const location = useLocation();
    const dispatch =  useDispatch();

    useEffect(()=>{
        if(successMessage){
            const timer = setTimeout(()=>{
                dispatch(resetMessages());
            },5000);
    
            return ()=>clearTimeout(timer);
        }
    },[successMessage, dispatch]);

    if(!successMessage || location.pathname!=='/'){
        return null;
    }

    return (
        <div className='order-message'>
            <h3>{successMessage.message}</h3>
            <img src={ideliveryManImg} alt='delivery man'/>
        </div>
    );
}

export default OrderMessage;