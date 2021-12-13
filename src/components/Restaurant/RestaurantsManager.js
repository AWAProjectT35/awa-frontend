import React from 'react'
import styles from './RestaurantsManager.module.css';
import RestaurantManager from './RestaurantManager';
import RestaurantManagerAdd from './RestaurantManagerAdd';


export default function Restaurants(props) {

    return (
        <div className={styles.container}>
            {props.restaurants.map((data, key) => <RestaurantManager key={key} data={data} />)}
            <RestaurantManagerAdd />
        </div>
    )
}