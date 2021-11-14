import { useDispatch } from 'react-redux';
import { showPizzaDetail } from '../../store/pizza/pizza-reducer';

import pizzaImg from '../../img/pizza-btn.png';
import detailImg from '../../img/show-detail.png';


const Pizza = (props) => {
    const dispatch = useDispatch()
    const showPizzaDetailHandler = (id) => {
        dispatch(showPizzaDetail(props.id));
    }

    return (
        <div>
            <p>{props.name}</p> 
            <p><b>{props.price}$</b></p>
            <img src={pizzaImg} height="30px" alt='pizza-img'/>
            <img src={detailImg} height="30px" onClick={showPizzaDetailHandler} alt='detail-pizza-img'/>
        </div>
    );
}

export default Pizza;