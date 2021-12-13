import React, { useState } from 'react'
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Constants from './Constants.json'





export default function Login(props) {
    
    const navigate = useNavigate();

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await axios.post(
                Constants.API_ADDRESS + '/loginForJWT',
                null,
                {
                    auth: {
                        username: event.target.username.value,
                        password: event.target.password.value
                    }
                }
            );
            
            const receivedJWT = result.data.token
                props.login(receivedJWT);
                    setTimeout(() => {
                        navigate('/', { replace: true })
                },1800)

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.loginContainer}>
                    <div className={styles.headerContainer}>
                        <div className={styles.header}>Welcome!</div>
                            <div >Log In or</div>
                        <div><Link to="/signup">Sign up</Link></div>
                    </div>
                <div className={styles.textContainer}>
                    <form onSubmit={ handleLoginSubmit }>
                        <div
                            >Username: <br />
                            <input type="text" name="username"/>
                        </div>
                        <div>  
                            Password: <br />
                            <input type="password" name="password"/>
                        </div>
                        <div>
                            <button type="submit" className={styles.logInBtn}>Login</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}



