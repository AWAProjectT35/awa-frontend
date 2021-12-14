import React from 'react'
import styles from './RestaurantsManager.module.css';
import RestaurantManager from './RestaurantManager';
import RestaurantManagerAdd from './RestaurantManagerAdd';


export default function RestaurantsManager({requestGetRestaurants}) {

    return (
        <div className={styles.container}>
            {requestGetRestaurants.getStateVar().map((restaurant, key) =>
                <RestaurantManager
                    restaurant={restaurant}
                    key={key} />
            )}

            <RestaurantManagerAdd />
        </div>
    )
}