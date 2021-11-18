import './CustomButton.css';

const CustomButton = (props) => {
    return (
        <button
            type="button" 
            className={`btn ${props.className}`}
            onClick={props.onClick}>
            {props.children}
        </button>
    );
}

export default CustomButton;