import { NavLink} from "react-router-dom";

import pizzaLogo from '../img/pizza.png';
import cartLogo from '../img/cart.png';
import { AppBar, Box, IconButton, Toolbar } from "@material-ui/core";

import styles from './Navbar.module.css';


const Navbar = () =>
{
    return (
        <AppBar position="static" 
            style={{
                backgroundColor:'#009900',
                marginBottom: '30px',
            }}
            >
            <Toolbar>
            <IconButton edge="start">
                <NavLink to="/">
                    <img src={pizzaLogo} height="50px" alt='pizza-logo'/>
                </NavLink>
            </IconButton>
            <Box display='flex' flexGrow={1}>
                <NavLink to='/pizzas' className={styles.link}>
                    Pizzas
                </NavLink>
                <NavLink to='/sauces' className={styles.link}>
                    Sauces
                </NavLink>
            </Box>
            <IconButton>
                <NavLink to="/cart">
                    <img src={cartLogo} height="50px" alt='cart'/>
                </NavLink>
            </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;