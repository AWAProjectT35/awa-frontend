import React from 'react';
import { useParams } from 'react-router';


function GetRestaurant(restaurants) {

    //Finding the correct restaurant to display using useParams().
    const index = useParams();

    const restaurant = restaurants.find(restaurant => restaurant.id === index.id );

    if (typeof restaurant === 'undefined') return (null)
    else return (restaurant)
}

function GetMenu(menuData, restaurant) {

    //Filtering the correct menu to display using the above function result.
    const menu = menuData.filter(menu =>
        menu.restaurant === restaurant.name
    )

    return (menu)
}

function GetProduct(menuData) {

    //Finding the correct product to display using useParams().
    const index = useParams();

    const product = menuData.find(product => product.id === index.productId );
    if ( product == null) {
        return <div>No matching product</div>
    }

    return (product)
}

function GetOrder(orders) {

    //Finding the correct product to display using useParams().
    const index = useParams();


    const order = orders.find(order => order.details.orderId == index.orderId);
    if (typeof order === 'undefined') return (null)
    else return (order)
}

function GetNewOrders(orders) {
    return orders.filter((order) => order.details.orderStatus === 0);
}

function GetInProgressOrders(orders) {
    return orders.filter((order) => (
        order.details.orderStatus !== 0 && order.details.orderStatus < 4
    ));
}


export {
    GetRestaurant,
    GetMenu,
    GetProduct,
    GetNewOrders,
    GetInProgressOrders,
    GetOrder
};
