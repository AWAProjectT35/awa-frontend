import { React, useState, useContext, useEffect} from 'react'
import { useParams } from 'react-router'
import styles from './RestaurantMenu.module.css'
import { Context } from './Context'
import {useData} from './DataProvider';

export const RestaurantMenu = ({ requestGetMenu }) => {

    
    //Using context.
    const context = useContext(Context);

    const [menu, setMenu] = useState([]);
    
    //useState for categories
    const [category, setCategory] = useState("Show All");

    //Finding the correct restaurant to display using useParams().
    const index = useParams(); 

    //
    const {userJWT, restaurants} = useData();

    requestGetMenu.setStateVar(menu);
    requestGetMenu.setStateVarFnc(setMenu);

    useEffect(() => {
        requestGetMenu.request(userJWT, '/public/restaurants/' + index.id + '/menu');
    }, [index.id])
    

    
    let restaurant = restaurants.filter(restaurant => restaurant.restaurantId === parseInt(index.id) ); 
        if ( restaurant == null) {
                return <div>No matching restaurant</div>
    }
    const cRestaurant = restaurant[parseInt(index.id) - parseInt(index.id)];
    
    

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
        default:
            categoryVar = "";
    }
    
    
    //Filtering to display categories
    const categoryMenu = menu.filter(menu => 
     menu.category.includes(categoryVar)
    )
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.restaurantInfoContainer}>
                    <div className={styles.restaurantName}>{cRestaurant.restaurantName} {context.getTotal(context.cart)}</div>
                        <div>{restaurant.type}  ·</div>
                            <div className={styles.restaurantFlex}>
                                <div>{cRestaurant.priceLevel}  ·</div>
                                <div>{cRestaurant.opens}  ·</div>
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
                                                            <div className={styles.imagebox}>
                                                                <img src={data.image} alt=""/>
                                                            </div>
                                                            <div><bold>{data.name}</bold></div>
                                                            <div>{data.description}</div>
                                                            <span>{data.price} $</span>
                                                            <div className={styles.menuItemsFlex}>
                                                                <button onClick={()=> context.remove(data)}>-</button>
                                                                <div></div>
                                                                <button onClick={()=> context.add(data)}>+</button>
                                                            </div>
                                                            </div>
                                                    </div>       
                                            )})}
                            
                </div>    
            </div>
        </div>                  
    )
}
