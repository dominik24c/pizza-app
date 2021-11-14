import sauceImg from '../../img/sauce.png';

const Sauce = (props) =>{
    return (
        <div className="sauce">
            <h3>{props.name}</h3>
            <p>Price: <b>{props.price}</b></p>
            <img src={sauceImg} height="30px" alt='sauce'/>
        </div>
    );
}

export default Sauce;
