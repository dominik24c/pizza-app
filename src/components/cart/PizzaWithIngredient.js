import Pizza from "./Pizza";

const PizzaWithIngredient = (props) => {
    const concatenateIngredients = () => {
        const ingredients = props.ingredients.map(i=>i.name);
        return ingredients.join(', ');
    }
    return (
            <Pizza
                id={props.id}
                name={props.name}
                totalAmount={props.totalAmount}
                totalPrice={props.totalPrice}
            >
                {props.ingredients && concatenateIngredients()}
                {!props.ingredients && "No ingredients"}
            </Pizza>
    );
}

export default PizzaWithIngredient;