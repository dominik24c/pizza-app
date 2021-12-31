import { NavLink} from "react-router-dom";

import pizzaLogo from '../img/pizza.png';
import cartLogo from '../img/cart.png';
import { AppBar, Box, IconButton, Toolbar } from "@material-ui/core";

import styles from './Navbar.module.css';
import { useSelector } from "react-redux";

const Navbar = () =>
{
    const totalAmount = useSelector(state=>state.cart.totalAmount);

    const printTotalAmount = (totalAmount) => {
        if(totalAmount && totalAmount >= 10){
            return '10+';
        }
        return totalAmount;
    }

    let totalAmountOfCart = '';
    if(totalAmount){
        totalAmountOfCart =  <span style={{
            position: 'absolute', 
            bottom:10, 
            right:3, 
            color:'green',
            fontWeight: 'bold',
            backgroundColor:'orange', 
            padding:'1px 3px', 
            fontSize:17
        }}>{printTotalAmount(totalAmount)}</span>;
    } 

    return (
        <AppBar position="static" 
            style={{
                backgroundColor:'#009900',
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
                {totalAmountOfCart}
            </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;