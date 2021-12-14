import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from './Context';
import styles from './ShoppingCart.module.css'
import {useData} from './DataProvider';



export default function ShoppingCart({requestPostOrder}) {
    
    const context = useContext(Context);

    const {userJWT} = useData();

    const [address, setAddress] = useState('');

    const [card, setCard] = useState('');
    const [name, setName] = useState('');
    const [cvc, setCvc] = useState('');
    
        const marker = [];

        if(card.length === 16)
        marker[0] = <span className={styles.greenMarker}></span>
        else 
            marker[0] = <span className={styles.redMarker}></span> 
            
            if(name.length > 10)
            marker[1] = <span className={styles.greenMarker}></span>
            else 
                marker[1] = <span className={styles.redMarker}></span> 
            
                if(cvc.length === 3)
                marker[2] = <span className={styles.greenMarker}></span>
                else 
                    marker[2] = <span className={styles.redMarker}></span> 
    
        let order = <>
            <div className={styles.addText}>
                <div >Card Number: 
                    <input
                    type="text"
                    value={card}
                    onChange={ (e) => setCard(e.target.value) } />
                    {marker[0]}
                </div>
                {marker[0]}
           
                <div > Cardholder Name: 
                <input
                type="text"
                value={name}
                onChange={ (e) => setName(e.target.value) } />
                </div>
                {marker[1]}

                <div > CVC: 
                <input className={styles.inputLength}
                type="text"
                value={cvc}
                onChange={ (e) => setCvc(e.target.value) } />                
                </div>
                {marker[2]}
                
            </div>
        </>

            
            if( card.length === 16 && name.length > 10 && cvc.length === 3 )
            
                order = <><button className={styles.orderButton}
                    onClick={() => {
            
                    let sendData = {"products": {},"deliveryAddress": address};
                        context.cart.map((x) => {
                            if (x.productId in sendData.products) {
                                return sendData.products[x.productId] += 1;
                            } else {
                                return sendData.products[x.productId] = 1;
                            }
                        });
                        
                    requestPostOrder.request(userJWT, '/customer/buy', sendData);
                }}>
                    Confirm Order
            </button>
            <button onClick={() => setCard('')}>Edit Card</button>
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
                             
                        </div>
                        {order}
                        
                    </div>
                </div>

                <Link to='/payment'>
                    <button>
                        payment page
                    </button>
                </Link>
        </div>
    )
}
