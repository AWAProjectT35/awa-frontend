//Getting cart total via .reduce()
function getTotal(cart) {
    const total = cart.reduce((totalCost, item) => totalCost + item.price, 0);
    return total.toLocaleString(undefined, currencyOptions)
}

//Reducer arg function for useReducer()
function cartReducer(state, action) {
    switch(action.type) {
    case 'add':
        return [...state, action.data];
    case 'remove':
        const productIndex = state.findIndex(item => item.name === action.data.name);
        if(productIndex < 0) {
        return state;
        }
        const update = [...state];
        update.splice(productIndex, 1)
        return update
    case 'empty':
        const empty = [];
        return empty;
    default:
        return state;
    }
}

//Function for adding products to cart.
function add(data) {
    const restaurant = data.restaurant;
    if(cart.length < 1) {
            setCart({ data, type: 'add' })
    } else {
        let id = cart.length -1;
        if(cart[id].restaurant != restaurant)
            alert("Cart contains products from multiple restaurants, please empty cart before continuing.");
        else
        setCart({ data, type: 'add' }) 
        
    }
}

//Function for removing products from cart.
function remove(data) {
    setCart({ data, type: 'remove' });
}

//Function for emptying shopping cart.
function empty(data) {
    setCart({ data, type: 'empty' });
}


export {
    getTotal,
    cartReducer,
    add,
    remove,
    empty
}