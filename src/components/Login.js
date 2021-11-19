import React, { useContext } from 'react'
import { UserContext } from '../UserContext'
import { loginFunc } from '../loginFunc';
import styles from './Login.module.css';


const Greeting = ({user}) => {
    let message;
    if (user) {
        console.log(user.username)
        message = "Hello " + user.username;
    } else {
        message = "Hello";
    }

    return <div className={styles.title}>{message}</div>;
};


const Button = ({user, setUser}) => {
    if (user) {
        return (<button className={styles.button} onClick={() => setUser(null)}>
                Log out
            </button>
        )
    } else {
        return (<button className={styles.button} onClick={async () => {
            const user = await loginFunc();
            setUser(user)}}>
                Log in
            </button>
        )
    }
};


export default function Login() {

    const {user, setUser} = useContext(UserContext);

    return (
        <div className={styles.container}>
            <Greeting user={user} />
            <Button user={user} setUser={setUser} />
        </div>
    )
}
