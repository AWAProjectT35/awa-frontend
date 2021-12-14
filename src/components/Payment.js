import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Home from './Home';
import { Context } from './Context';
import styles from './Payment.module.css';

export default function Payment({payment, setPayment}) {

    const context = useContext(Context);

    const inputs = {
        'online_bank': 'Online Bank',
        'debit_card': 'Debit Card',
        'credit_card': 'Credit Card'
    };

    function PaymentOptions() {
        return (
            <div className={styles.inputs}>
                {Object.keys(inputs).map((key, i) => {
                    return (
                        <div key={i}>
                            <input
                                onChange={(e) => setPayment(e.target.value)}
                                type='radio'
                                name='payment'
                                id={key}
                                checked={(payment === key) ? 'checked' : null}
                                value={key} />
                            <label htmlFor={key}>{inputs[key]}</label>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.payments}>
                <PaymentOptions />

                {(payment) ? (
                    <Link to='/'>
                        <div className={styles.buttonDiv}>
                            <button
                                onClick={() => {
                                    if (payment) {
                                        context.empty();
                                    } else {
                                        alert("Choose a payment method first");
                                    }
                                }}>
                                    Pay
                            </button>
                        </div>
                    </Link>
                ) : null}
            </div>
        </div>
    )
}
