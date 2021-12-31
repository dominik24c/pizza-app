import reactDom from 'react-dom';
import { Routes ,Route } from 'react-router-dom';

import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import PizzaList from './components/pizza/PizzaList';
import Cart from './components/cart/Cart';
import SauceList from './components/pizza/SauceList';
import NotFound from './components/errors/NotFound';
import OrderMessage from './components/pizza/OrderMessage';

const App = () => {
  return (
    <div className="App">
      <OrderMessage/>
      <section>
        {reactDom.createPortal(<Navbar/>, document.getElementById('navbar'))}
        {reactDom.createPortal(<Footer/>, document.getElementById('footer'))}
          <Routes>
            <Route path='/' exact element={<PizzaList/>}/>
            <Route path='/pizzas' exact element={<PizzaList/>}/>
            <Route path='/sauces' exact element={<SauceList/>}/>
            <Route path='/cart' exact element={<Cart/>}/>
            <Route path='*' exact element={<NotFound/>}/>
        </Routes>
      </section>
    </div>
  );
}

export default App;
