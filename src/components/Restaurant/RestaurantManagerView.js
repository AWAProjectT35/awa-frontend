import { React, useState, useReducer} from 'react'
import { useParams } from 'react-router'
import styles from './RestaurantMenu.module.css'
    

    const currencyOptions = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }
  
    function getTotal(cart) {
        const total = cart.reduce((totalCost, item) => totalCost + item.price, 0);
        return total.toLocaleString(undefined, currencyOptions)
    }
    

    //
    function cartReducer(state, action) {
        switch(action.type) {
        case 'add':
            return [...state, action.product];
        case 'remove':
            const productIndex = state.findIndex(item => item.name === action.product.name);
            if(productIndex < 0) {
            return state;
            }
            const update = [...state];
            update.splice(productIndex, 1)
            return update
        default:
            return state;
        }
    }


export const RestaurantManagerView = ({menuData, restaurants}) => {

    

    //useState for shopping cart
    const [cart, setCart] = useReducer(cartReducer, []);
  
    console.log(cart.map(item => item.name + " " + item.price)
    );
    
    //function for adding products to cart.
    function add(product) {
        setCart({ product, type: 'add' })
    }

    //function for removing products from cart.
    function remove(product) {
        setCart({ product, type: 'remove' });
    }
    
    //useState for categories
    const [category, setCategory] = useState("Show All");

    //Finding the correct restaurant to display using useParams().
    const index = useParams(); 

    const restaurant = restaurants.find(restaurant => restaurant.id === index.id );
    if ( restaurant == null) {
        return <div>No matching restaurant</div>
    }

    //Filtering the correct menu to display using the above function result.
    const specificMenu = menuData.filter(menu => 
        menu.restaurant === restaurant.name
    )

    //Filtering with state to display All or specific category.
    let categoryVar;
    switch(category) {
        case "Show All":
            categoryVar = "";
            break;
        case "Appetizers":
            categoryVar = "Appetizers";
            break;
        case "Main Dishes":
            categoryVar = "Main Dishes";
            break;
        case "Desserts":
            categoryVar = "Desserts";
            break;
    }
    
    //Filtering to display categories
    const categoryMenu = specificMenu.filter(menu => 
     menu.category.includes(categoryVar)
    )
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.restaurantInfoContainer}>
                    <div className={styles.restaurantName}>{restaurant.name}{getTotal(cart)}</div>
                        <div>{restaurant.type}  ·</div>
                            <div className={styles.restaurantFlex}>
                                <div>{restaurant.price}  ·</div>
                                <div>{restaurant.openHrs}  ·</div>
                            </div>
                        </div>
                    <div className={styles.categoriesWrapper}>
                        <div className={styles.categoriesContainer}>
                                                <button onClick={()=> setCategory("Show All")}>Show All</button>
                                                <button onClick={()=> setCategory("Appetizers")}>Appetizers</button>
                                                <button onClick={()=> setCategory("Main Dishes")}>Main Dishes</button>
                                                <button onClick={()=> setCategory("Desserts")}>Desserts</button>
                                            </div>
                                        </div>
                                    <div className={styles.menuContainer}>
                                        <div className={styles.menuHeader}>{category}</div>
                                            {categoryMenu.map( data => {
                                                return (
                                                    <div key={data.id} className={styles.menuItemsContainer}>
                                                        <div className={styles.menuItems}>
                                                            <div>{data.name}</div>
                                                                <div>{data.description}</div>
                                                                    <span>{data.price}$</span>
                                                                        <div className={styles.menuItemsFlex}>
                                                                            <button onClick={()=> remove(data)}>-</button>
                                                                            <div></div>
                                                                            <button onClick={()=> add(data)}>+</button>
                                                                        </div>
                                                            </div>
                                                    </div>       
                                            )})}
                            
                </div>    
            </div>
        </div>                  
    )
}
