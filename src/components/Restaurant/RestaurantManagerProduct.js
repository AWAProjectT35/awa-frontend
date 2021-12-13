import React from 'react';
import {GetProduct} from '../Tools';
import styles from './RestaurantManagerProduct.module.css';

export default function RestaurantManagerProduct({menuData}) {
    const product = GetProduct(menuData);

    return (
        <div className={styles.container}>
            <div className={styles.left}>Name:</div>
            <div className={styles.right}>{product.name}</div>

            <div className={styles.left}>Category:</div>
            <div className={styles.right}>{product.category}</div>

            <div className={styles.left}>Description:</div>
            <div className={styles.right}>{product.description}</div>

            <div className={styles.left}>Image:</div>
            <div className={styles.right}>{product.image}</div>
        
            <div className={styles.left}>Price:</div>
            <div className={styles.right}>{product.price}</div>
        </div>
    )
}
