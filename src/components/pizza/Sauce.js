import { useDispatch } from 'react-redux';

import { addSauce } from '../../store/pizza/cart-reducer';
import SauceBtn from '../UI/SauceBtn';

const Sauce = (props) =>{
    const dispatch = useDispatch();

    const addSauceHandler = () => {
        dispatch(addSauce(props.sauce));
    }
    return (
        <div className="sauce">
            <h3>{props.sauce.name}</h3>
            <p>Price: <b>{props.sauce.price}</b></p>
            <SauceBtn clickHandler={()=>addSauceHandler()}/>
        </div>
    );
}

export default Sauce;
