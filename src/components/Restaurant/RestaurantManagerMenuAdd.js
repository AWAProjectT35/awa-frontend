import React from 'react';
import styles from './RestaurantManagerProduct.module.css';

export default function RestaurantManagerMenuAdd({menuData}) {

    return (
        <>
            <div className={styles.container}>
                <div>Name:</div>
                <div><input type="text" /></div>

                <div>Category:</div>
                <div><input type="text" /></div>

                <div>Description:</div>
                <div><input type="text" /></div>

                <div>Image:</div>
                <div><input type="url" /></div>

                <div>Price:</div>
                <div><input type="number" step="0.01" min="0" /></div>
            </div>

            <button className={styles.buttonSave}>
                Save product
            </button>
        </>
    )
}
