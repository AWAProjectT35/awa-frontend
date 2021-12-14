import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Home from './Home';
import { Context } from './Context';
import styles from './Payment.module.css';

export default function Payment({payment, setPayment}) {

    const context = useContext(Context);

    const [card, setCard] = useState('');
    const [name, setName] = useState('');
    const [cvc, setCvc] = useState('');
    const [paymentType, setPaymentType] = useState();
    
    let values = []
    const marker = [];
        
        if(card.length == 16) {
        marker[0] = <span className={styles.greenMarker}></span>
        values[0] = 1
            }else {
            marker[0] = <span className={styles.redMarker}></span> 
            values[0] = 0
            }
            
            if(name.length > 10) {
            marker[1] = <span className={styles.greenMarker}></span>
            values[1] = 1
                }else {
                marker[1] = <span className={styles.redMarker}></span> 
                values[1] = 0;
                }

                if(cvc.length == 3) {
                marker[2] = <span className={styles.greenMarker}></span>
                values[2] = 1
                }else {
                    marker[2] = <span className={styles.redMarker}></span> 
                    values[2] = 0;
                }

        let nullPaymentFields = <div className={styles.addText}></div>        
        let paymentCardFields = <>
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
                <div><button onClick={() => setCard('')}>Edit Card</button></div>
            </div>
            
        </>

    const inputs = {
        'online_bank': 'Online Bank',
        'debit_card': 'Debit Card',
        'credit_card': 'Credit Card'
    };

    function PaymentOptions() {
        return (
            <div className={styles.inputs}>
                {Object.keys(inputs).map((key) => {
                    return (
                        <>
                            <input
                                onChange={(e) => setPaymentType(e.target.value)}
                                type='radio'
                                name='paymentType'
                                id={key}
                                checked={(paymentType === key) ? 'checked' : null}
                                value={key} />
                            <label for={key}>{inputs[key]}</label>
                        </>
                    )
                })}
            </div>
        )
    }
    
    function PayButton() {
        return(
            
                    <div className={styles.buttonDiv}>
                    <Link to='/shoppingcart'>
                        <button onClick={() => setPayment(true)}>
                            Pay
                        </button>
                        </Link>
                    </div>
        )
    }
    
    function GreyButton() {
        return(
            <div className={styles.greyButton}>
                        <button disabled>
                            Pay
                        </button>
            </div>
        )
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.payments}>
                <PaymentOptions />
                {(paymentType == "online_bank") ? nullPaymentFields : (paymentCardFields)}
 
                {(paymentType === "online_bank" ||(paymentType && values[0]==1 && values[1]==1 && values[2]==1 )) ? <PayButton/> : <GreyButton/>}       
                
            </div>
            
        </div>
    )
}
