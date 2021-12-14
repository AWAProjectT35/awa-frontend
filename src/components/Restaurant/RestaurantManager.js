import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './RestaurantManager.module.css'
import { RequestGet } from '../../Tools/requestClasses';
import { useData } from '../DataProvider';


export default function RestaurantManager({restaurant}) {

    const [ orders, setOrders ] = useState([]);
    const { userJWT } = useData([]);
    const requestGetOrders = new RequestGet(orders, setOrders);

    useEffect(() => {
        requestGetOrders.request(
            userJWT,
            '/manager/restaurants/' + restaurant.restaurantId + '/orders');
    }, [])

    return (
        <div style={{position: 'relative'}}>
            <Link to={'' + restaurant.restaurantId} style={{ textDecoration: 'none' }} >
                <div className={styles.box}>
                    <div style={{width: "231px", height: "231px"}}>
                        <img src={restaurant.image} alt={restaurant.image} width="225px" />
                    </div>
        
        
                    <div className={styles.title}>
                        {restaurant.restaurantName}
                    </div>
        
                    <div className={styles.marginDiv} />
        
        
                    <div className={styles.marginDiv} />
        
                    <div className={styles.restInfo}>
                        <div>
                            Orders: {requestGetOrders.getStateVar().length}
                            <br />
                            New Orders: {requestGetOrders.getStateVar().filter(order =>
                                order.orderStatus === 0).length}
                        </div>
                    </div>
                </div>
            </Link>

            <Link to={'manage/' + restaurant.restaurantId}>
                <button className={styles.buttonEdit}>
                    E
                </button>
            </Link>

            <Link to={'menu/' + restaurant.restaurantId}>
                <div className={styles.buttonMenuContainer}>
                    <button className={styles.buttonMenu}>
                        Menu
                    </button>
                </div>
            </Link>
        </div>
    )
}
