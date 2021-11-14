import { useDispatch } from 'react-redux';

import sauceImg from '../../img/sauce.png';
import { addSauce } from '../../store/pizza/cart-reducer';

const Sauce = (props) =>{
    const dispatch = useDispatch();

    const addSauceHandler = () => {
        dispatch(addSauce(props.sauce));
    }
    return (
        <div className="sauce">
            <h3>{props.sauce.name}</h3>
            <p>Price: <b>{props.sauce.price}</b></p>
            <img src={sauceImg} height="30px" alt='sauce'
                onClick={addSauceHandler}/>
        </div>
    );
}

export default Sauce;
