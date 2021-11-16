export const comparePizzas = (pizza, searchedPizzas) =>{
    let index = -1;
    let tmpIndex = 0;
            for (const searchedPizza of searchedPizzas) {
                //comparing ingredients

                if(searchedPizza.ingredients.length === pizza.ingredients.length){
                    const idArr1 = searchedPizza.ingredients.map(i=>{
                        return i.id;
                    });
                    const idArr2 = pizza.ingredients.map(i=>{
                        return i.id;
                    });

                    const arr1 = idArr1.slice().sort().join(","); 
                    const arr2 = idArr2.slice().sort().join(",");

                    if(arr1===arr2){
                        index= tmpIndex;
                        break;
                    }
                }
                tmpIndex+=1;
            }
    return index;
}

export const addPizzaHandler = (state,pizza) => {
    const pizzaIndex = state.pizzas.findIndex(p=>p.id===pizza.id);
    if(pizzaIndex===-1){
        state.pizzas = [...state.pizzas,{...pizza,key:pizza.id, totalAmount:1}]
    }else{
        state.pizzas[pizzaIndex].totalAmount+=1;
    }
}

export const addPizzaWithChangedIngredientsHandler = (state,pizza,index) => {
    // const pizzaIndex = state.pizzasWithChangedIngredients.findIndex(p=>p.id===pizza.id);
    if(index===-1){
        state.pizzasWithChangedIngredients = [...state.pizzasWithChangedIngredients,{...pizza,key:pizza.id, totalAmount:1}]
    }else{
        state.pizzasWithChangedIngredients[index].totalAmount+=1;
    }
}

export const deletePizzaByIdHandler = (pizzasArr, pizzaId) => {
    const pizza = pizzasArr.find(p=>p.key===pizzaId);
    // console.log('in delete handler');
    // console.dir(pizza);
    if(pizza && pizza.totalAmount && pizza.totalAmount>1){
        pizza.totalAmount-=1;
    }else{
        pizzasArr = pizzasArr.filter(p=>p.key !== pizzaId);
    }
    return {
        pizza,
        pizzasArr
    };
}