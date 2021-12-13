import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import {GetRestaurant, GetMenu} from '../Tools';
import styles from './RestaurantManagerMenu.module.css';

export default function RestaurantsManagerMenu({restaurants, menuData}) {

    const restaurant = GetRestaurant(restaurants);
    if (restaurant === null) return (<div>No restaurant found</div>);

    const menu = GetMenu(menuData, restaurant);
    if (menu === null) return (<div>No menu found</div>);

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <Link to="new">
                    <button className={styles.buttonAdd}>
                        Add
                    </button>
                </Link>

                {menu.map((item, i) =>
                    <Link key={i} to={item.id}>
                        <div>
                            {item.name}
                        </div>
                    </Link>
                )}
            </div>

            <div className={styles.right}>
                <Outlet />
            </div>
        </div>
    )
}
