import sauceImg from '../../img/sauce.png';
import './SauceBtn.css';

const SauceBtn = (props) =>{
    return (
        <img className="Sauce" src={sauceImg} height="30px" alt='sauce'
              onClick={props.clickHandler}/>
    );
}

export default SauceBtn;