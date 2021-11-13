import { NavLink} from "react-router-dom";

import pizzaLogo from '../img/pizza.png';
import cartLogo from '../img/cart.png';

const Navbar = () =>
{
    return (
        <>
            <NavLink to="/">
                <img src={pizzaLogo} height="50px"/>
            </NavLink>
            <ul>
                <li>
                    <NavLink to="/pizzas">Pizzas</NavLink>
                </li>
                <li>
                    <NavLink to="/sauces">Sauces</NavLink>
                </li>
            </ul>
            <NavLink to="/cart">
                <img src={cartLogo} height="50px"/>
            </NavLink>
        </>
    );
};

export default Navbar;