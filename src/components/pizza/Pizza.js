import { useDispatch } from 'react-redux';
import { showPizzaDetail } from '../../store/pizza/pizza-reducer';
import { addPizza } from '../../store/pizza/cart-reducer'; 
import pizzaImg from '../../img/pizza-btn.png';
import detailImg from '../../img/show-detail.png';


const Pizza = (props) => {
    const dispatch = useDispatch()
    const showPizzaDetailHandler = () => {
        dispatch(showPizzaDetail(props.pizza.id));
    }

    const addPizzaHandler = () => {
        dispatch(addPizza(props.pizza));
    }

    return (
        <div>
            <p>{props.pizza.name}</p> 
            <p><b>{props.pizza.price}$</b></p>
            <img src={pizzaImg} height="30px" alt='pizza-img' onClick={addPizzaHandler}/>
            <img src={detailImg} height="30px" onClick={showPizzaDetailHandler} alt='detail-pizza-img'/>
        </div>
    );
}

export default Pizza;