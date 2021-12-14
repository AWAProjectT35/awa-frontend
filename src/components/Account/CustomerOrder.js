import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { RequestGet, RequestPut } from '../../Tools/requestClasses';
import { useData } from '../DataProvider';
import styles from './CustomerOrder.module.css';

export default function CustomerOrder() {

    const { userJWT } = useData();
    const params = useParams();

    const detailsKeys = {
        'deliveryAddress': 'Adress',
        'eta': 'ETA',
        'orderDate': 'Date',
        'orderId': 'ID',
        'orderStatus': 'Status',
        'total': 'Price',
        'restaurantId': 'Restaurant ID'
    };
    const productsKeys = {
        'amount': 'Amount',
        'productId': 'ID',
        'productPrice': 'Price'
    };

    const requestGetOrders = new RequestGet([]);

    const [ order, setOrder ] = useState({'details': detailsKeys, 'products': []});
    const requestGetOrder = new RequestGet(order, setOrder);

    const requestPutConfirm = new RequestPut();

    useEffect(() => {
        requestGetOrder.request(userJWT, '/customer/orders/' + params.id);
    }, [])

    const foundOrder = requestGetOrders.getStateVar().map((o) => o.orderId == params.id);
    if (typeof foundOrder === 'undefined') {
        return (
            <div>
                Order not found
            </div>
        )
    }

    function ConfirmDelivery() {
        return (
            <button
                style={{marginTop: "50px"}}
                onClick={() => {
                    requestPutConfirm.request(
                        userJWT,
                        '/customer/orders/' + params.id + '/confirm');
                    requestGetOrder.request(userJWT, '/customer/orders/' + params.id);
                }}>
                    Confirm
            </button>
        );
    }

    return (
        <div>
            <h3>Order</h3>
            <div className={styles.details}>
                {Object.keys(detailsKeys).map((key) => {
                    return (
                            <div>
                                <div className={styles.detailsHeader}>
                                    {detailsKeys[key]}
                                </div>
                                <div className={styles.detailsValue}>
                                    {requestGetOrder.getStateVar().details[key]}
                                </div>
                            </div>
                    )
                })}
            </div>

            <h3>Products</h3>
            <div className={styles.details}>
                {Object.keys(productsKeys).map((key) => {
                    return (
                            <div>
                                <div className={styles.detailsHeader}>
                                    {productsKeys[key]}
                                </div>
                                <div className={styles.detailsValue}>
                                    {requestGetOrder.getStateVar().products.map((product) => {
                                        return (
                                            product[key]
                                        )
                                    })}
                                </div>
                            </div>
                    )
                })}
            </div>

            {(order.details.orderStatus == 3) ? <ConfirmDelivery /> : null}
        </div>
    )
}
