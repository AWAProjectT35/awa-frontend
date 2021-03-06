import React, { useState, useEffect } from 'react'
import { RequestGet } from '../../Tools/requestClasses';
import styles from './OrderHistory.module.css';
import { Link } from 'react-router-dom';


export default function OrderHistory({userJWT}) {

    const [ orders, setOrders ] = useState([]);
    const requestGetOrders = new RequestGet(orders, setOrders);
    const orderKeys = {
        'orderId': 'ID',
        'orderStatus': 'Status',
        'orderDate': 'Date',
        'total': 'Total',
        'deliveryAddress': 'Address',
        'eta': 'ETA'
    };

    useEffect(() => {
        requestGetOrders.request(userJWT, '/customer/orders');
        console.log('requestGetOrders', requestGetOrders);
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                {Object.values(orderKeys).map((val, h) => {
                    return (
                        <div className={styles.header} key={h}>
                            {val}
                        </div>
                    )
                })}
            </div>

                {requestGetOrders.getStateVar().map((order, i) => {
                    return (
                        <Link to={'' + order.orderId} key={i}>
                            <div className={styles.dataRow}>
                                {Object.keys(orderKeys).map((key, a) => {
                                    return (
                                        <div className={styles.dataCol} key={a}>
                                            {order[key]}
                                        </div>
                                    )
                                })}
                            </div>
                        </Link>
                    )
                })}
        </div>
    )
}
