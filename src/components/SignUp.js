import React, { useState} from 'react'
import axios from 'axios'
import styles from './SignUp.module.css'
import Constants from './Constants.json'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
    const [ signupProcessState, setSignupProcessState] = useState("idle")
    const navigate = useNavigate();
    
    const handleSignupSubmit = async (event) => {
        event.preventDefault();
        setSignupProcessState("processing");
         
        try {
            const result = await axios.post(Constants.API_ADDRESS + '/public/users',
            {
                userName: event.target.username.value,
                address: event.target.address.value,
                manager: event.target.manager.checked,
                password: event.target.password.value
            })
            console.log(result);
            setSignupProcessState("signupSuccess")
            setTimeout(() => {
                navigate('/login', { replace: true })
            },1500)
        } catch (error) {
            console.log(error);
            setSignupProcessState("signupFailure");
        }
    }

    let signupUIControls = null;
    switch(signupProcessState) {
        case "idle":
            signupUIControls = <button className={styles.logInBtn} type="submit">Submit</button>
            break;

        case "processing":
            signupUIControls = <span>Processing...</span>
            break;

        case "signupSuccess":
            signupUIControls = <span style={{color: "green"}}>Signup Success</span>
            break;

        case "signupFailure":
            signupUIControls = <span style={{color: "red"}}>Error</span>
            break;

        default:
            break;

    }
  
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.loginContainer}>
                    <div className={styles.headerContainer}>
                        <div className={styles.header}>Welcome!</div>
                        <div >Create an Account</div>
                    </div>
                    <div className={styles.textContainer}>
                    <form onSubmit={handleSignupSubmit}>
                        <div
                            >Username: <br />
                            <input type="text" name="username"/>
                        </div>
                        <div
                            >Address: <br />
                            <input type="text" name="address"/>
                        </div>
                        <div
                            >Manager: 
                            <input type="checkbox" name="manager"/>
                        </div>
                        <div>  
                            Password: <br />
                            <input type="password" name="password"/>
                        </div>
                        <div>
                            { signupUIControls }
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
