import React from 'react';
import {GetRestaurant, GetOrder} from '../Tools';
import styles from './RestaurantManagerOrder.module.css'

export default function RestaurantManagerOrder({restaurants, orders}) {

    const restaurant = GetRestaurant(restaurants);
    if (restaurant === null) return (<div>No restaurant found</div>);

    const order = GetOrder(orders);
    if (order === null) return (<div>No order found</div>);

    const productKeys = {
        'amount': 'Amount',
        'orderId': 'Order ID',
        'productId': 'Product ID',
        'productPrice': 'Price'
    }

    const orderStatuses = {
        0: 'Received',
        1: 'Preparing',
        2: 'Ready for delivery',
        3: 'Delivering',
        4: 'Delivered'
    }

    return (
        <div>
            <div className={styles.headersRow}>
                {Object.values(productKeys).map((key) => {
                    return (
                        <div className={styles.headersCol}>
                            {key}
                        </div>
                    )
                })}
            </div>

            {order.products.map((product) => {
                return (
                    <div className={styles.productsRow}>
                        {Object.keys(productKeys).map((key) => {
                            return (
                                <div className={styles.productsCol}>
                                    {product[key]}
                                </div>
                            )
                        })}
                    </div>
                )
            })}

            {(order.details.orderStatus == 0) ? (
                    <>
                        <input type="time" />
                        <br />
                    </>
                ) : null}

            <button onClick={() => alert("send status update")}>
                Status to: {orderStatuses[order.details.orderStatus + 1]}
            </button>
        </div>
    )
}
