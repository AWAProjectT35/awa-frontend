import { React, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import styles from './RestaurantManagerOrder.module.css'
import {useData} from '../DataProvider';
import { RequestGet } from '../../Tools/requestClasses';


export default function RestaurantManagerOrder({
    requestGetRestaurants,
    requestGetOrders,
    requestPutOrders
}) {

    const { userJWT } = useData();
    const params = useParams();
    const [ eta, setEta ] = useState();
    const [ order, setOrder ] = useState(
        {
            'details':
                {
                    'deliveryAddress': '',
                    'eta': '',
                    'orderDate': '',
                    'orderStatus': 0,
                    'restaurantId': params.id,
                    'total': 0,
                    'username': ''
                },
            'products': []
        });
    const requestGetOrder = new RequestGet();
    const restaurant = requestGetRestaurants.getStateVar().find((r) => 
        r.restaurantId === params.id);
    const foundOrder = requestGetOrders.getStateVar().find((o) =>
        o.orderId === params.orderId);

    const productKeys = {
        // 'orderId': 'ID',
        'productId': 'Product ID',
        'amount': 'Amount',
        'productPrice': 'Price'
    }
    const orderKeys = {
        'orderId': 'ID',
        'username': 'Customer',
        'orderStatus': 'Status',
        'orderDate': 'Date',
        'total': 'Total',
        'deliveryAddress': 'Address',
        'eta': 'ETA'
    };
    const orderStatuses = {
        0: 'Received',
        1: 'Preparing',
        2: 'Ready for delivery',
        3: 'Delivering',
        4: 'Delivered'
    }

    requestGetOrder.setStateVar(order);
    requestGetOrder.setStateVarFnc(setOrder);

    useEffect(() => {
        requestGetOrder.request(
            userJWT,
            '/manager/restaurant/orders/' + params.orderId
        )
        console.log('order', order)
    }, [])

    if (typeof restaurant === 'undefined' || typeof foundOrder === 'undefined') {
        return (
            <div>
                Restaurant or order not found
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.order}>
            <h3>Order Details</h3>
                {Object.keys(orderKeys).map((key) => {
                    return (
                        // <div className={styles.orderCol}>
                        //     <div className={styles.orderHeader}>
                        //         {orderKeys[key]}
                        //     </div>
                        //     <div className={styles.orderOrder}>
                        //         {order.details[key]}
                        //     </div>
                        // </div>
                        <div>

                        <div className={styles.tag}>{key}</div>
                        <div >{order.details[key]}</div>
                            
                        </div>
                    )
                })}

                <div className={styles.ButtonBox}>
                <button onClick={() => {
                    requestPutOrders.request(
                        userJWT,
                        '/manager/restaurants/orders/' + params.orderId,
                        {'status': (parseInt(order.details.orderStatus) + 1), 'eta': eta }
                    );
                }}>
                    Status to: {orderStatuses[order.details.orderStatus + 1]}
                </button></div>
            </div>

            <div className={styles.products}>
            <div >

                <h3>Products</h3>
                <div className={styles.table}>
                    <div className={styles.productsHeaderRow}>
                    {Object.keys(productKeys).map((key) => {
                        return(
                                <div className={styles.productsCol}>{productKeys[key]}</div>               
                        )
                    })}
                    </div>
                    {order.products.map((p) => {
                        return(
                            <div className={styles.productRow}>
                                {Object.keys(productKeys).map((key) => {
                                return(
                                    <div className={styles.productsCol}>               
                                                {p[key]}
                                    </div>
                                )
                                })}
                            </div>
                        )
                    })}
                    

                </div>
                {/* {Object.keys(productKeys).map((key) => {
                    return (
                        <div className={styles.productsCol}>
                            <div className={styles.productsHeader}>
                                {productKeys[key]}
                            </div>
                            <div className={styles.productsProduct}>
                                {order.products.map((p) => p[key])}
                            </div>
                        </div>
                    )
                })} */}
                </div>
            </div>

            {(order.details.orderStatus === 0) ? (
                    <>
                        <input
                            type="time"
                            value={eta}
                            onChange={ (e) => setEta(e.target.value) } />
                        <br />
                    </>
                ) : null}

            {/* <button onClick={() => {
                requestPutOrders.request(
                    userJWT,
                    '/manager/restaurants/orders/' + params.orderId,
                    {'status': (parseInt(order.details.orderStatus) + 1), 'eta': eta }
                );
            }}>
                Status to: {orderStatuses[order.details.orderStatus + 1]}
            </button> */}
        </div>
    )
}