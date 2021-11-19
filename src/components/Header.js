import React, { useContext} from 'react'
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { UserContext } from '../UserContext'


export default function Header() {

    const {user, setUser} = useContext(UserContext);

    return (
        <header>
            <div className={styles.container}>
                <Link to="/">Home</Link>
                <Link to="/restaurants">Restaurants</Link>
                <input className={styles.search} type='text' />

                <div className={styles.loginButtons}>
                <Link to="/login">Login</Link>
                {user ? null : <Link to="/signup">Sign up</Link>}
                {user ? <button className={styles.btn} onClick={() =>
                    { setUser(null); }}>Log out</button> : null} 
                </div>

                {user ? <Link to="/"><img src="/images/cart.png" alt=""/></Link> : null}
            </div>
        </header>
    )
}
