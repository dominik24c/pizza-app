import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import deliveryManImg from '../../img/deliveryman.png';
import {resetMessages} from '../../store/pizza/cart-reducer';
import {useLocation} from 'react-router-dom';

import './OrderMessage.css';

const OrderMessage = () => {
    const successMessage = useSelector(state => state.cart.successMessage);
    const location = useLocation();
    const dispatch = useDispatch();
    const [timer, setTimer] = useState(null);
    const [isMessageOnMenuPage,setIsMessageOnMenuPage] = useState(false);

    useEffect(() => {
        if(successMessage){
            const t = setTimeout(() => {
            setIsMessageOnMenuPage(false);
            dispatch(resetMessages());
            }, 5000);
            setTimer(t);
            setIsMessageOnMenuPage(true);
        }
    }, [successMessage, dispatch]);

    if(isMessageOnMenuPage && location.pathname !== '/'){
        setIsMessageOnMenuPage(false);
        if(timer){
            clearTimeout(timer);
            setTimer(null);
            dispatch(resetMessages());
        }
    }

    if (!successMessage || location.pathname !== '/') {
        return null;
    }

    return (
        <div className='order-message'>
            <h3>{successMessage.message}</h3>
            <img src={deliveryManImg} alt='delivery man'/>
        </div>
    );
}

export default OrderMessage;