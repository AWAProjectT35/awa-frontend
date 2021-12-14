import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from './Context';
import styles from './ShoppingCart.module.css'
import {useData} from './DataProvider';



export default function ShoppingCart({requestPostOrder, payment, setPayment}) {
    
    const context = useContext(Context);

    const {userJWT} = useData();

    const [address, setAddress] = useState('');

   
        let order;
        order = <><button className={styles.orderButton}
                    onClick={() => {
            
                    let sendData = {"products": {},"deliveryAddress": address};
                        context.cart.map((x) => {
                            if (x.productId in sendData.products) {
                                sendData.products[x.productId] += 1;
                            } else {
                                sendData.products[x.productId] = 1;
                            }
                            
                        });
                        
                    requestPostOrder.request(userJWT, '/customer/buy', sendData);
                    context.empty();
                    setAddress();
                    setPayment(false);
                }}>
                    Confirm Order
            </button>
            
            </>






    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.shoppingCartContainer}>
                    <div className={styles.cartHeader}>
                        <h1>Shopping Cart</h1>
                    </div>
                        <div className={styles.cartItems}>
                            {context.cart.map((data, key) => <div className={styles.cartItemsFlex} key={key}>
                                <div>{data.name}</div>
                                    <div>{data.price}€</div>
                                        <button onClick={() => context.remove(data)}>-</button>
                                            <button onClick={() => context.add(data)}>+</button>
                                        </div>)} 
                                            <div className={styles.cartInfo}>
                                                <span>Cart Total: </span>
                                                    <div>{context.getTotal(context.cart)}€  </div>
                                                <button onClick={() => context.empty(context.data)}>Empty Cart</button>
                                            </div>
                                        <div className={styles.deliveryAddress}>
                                            <span>Delivery Address: </span>
                                                <input
                                                    type="text"
                                                    value={address}
                                                    onChange={ (e) => setAddress(e.target.value) } />
                                            </div>
                                            {(payment == false ? (
                                            <>
                                            <Link to='/payment'>
                                                <button>
                                                    payment page
                                                </button>
                                            </Link>
                                            </>)   : null)}
                             
                        </div>
                        {(payment != false ? (
                            (order)
                        )   : null)}
                    </div>
                </div>

                
        </div>
    )
}
