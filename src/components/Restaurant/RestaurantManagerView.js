import { React, useState} from 'react'
import {GetRestaurant, GetNewOrders, GetInProgressOrders} from '../Tools';
import { Link, Outlet } from 'react-router-dom';
import styles from './RestaurantManagerView.module.css'


export const RestaurantManagerView = ({restaurants, orders}) => {

    const restaurant = GetRestaurant(restaurants);
    if (restaurant === null) return (<div>No restaurant found</div>);

    const newOrders = GetNewOrders(orders);
    const inProgressOrders = GetInProgressOrders(orders);

    console.log(orders[0])

    const leftOrderKeys = {
        'orderId': 'ID',
        'username': 'Name',
        'orderStatus': 'Status'
    };

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.leftRowHeader}>
                    {Object.values(leftOrderKeys).map((key) => {
                        return (
                            <div className={styles.leftCellHeader}>
                                {key}
                            </div>
                        )
                    })}
                </div>

                {orders.map(order => {
                    return (
                        <Link to={'' + order.details.orderId}>
                            <div className={styles.leftRow}>
                                {Object.keys(leftOrderKeys).map((key) => {
                                    return (
                                        <div className={styles.leftCell}>
                                            {order.details[key]}
                                        </div>
                                    )
                                })}
                            </div>
                        </Link>
                    )
                })}
            </div>

            <div className={styles.right}>
                <Outlet />
            </div>
        </div>                  
    )
}