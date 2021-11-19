import React from 'react'
import styles from './Restaurants.module.css';
import Restaurant from './Restaurant';


export default function Restaurants(props) {

    return (
        <div className={styles.container}>
            {props.restaurants.map((data, key) => <Restaurant key={key} data={data} />)}
        </div>
    )
}
