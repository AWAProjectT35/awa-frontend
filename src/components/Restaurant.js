import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Restaurant.module.css'


export default function Restaurant({data}) {

    return (
        <Link to={data.id } style={{ textDecoration: 'none' }} >
        <div className={styles.box}>
            <div key={data.id}>
            <img src={data.image} alt=""/>
            <div className={styles.title}>
                {data.name}
            </div>

            <div className={styles.restInfo}>
                <div>
                    {data.address}
                </div>
                <div>
                    Avoinna: {data.openHrs}
                </div>
                <div>
                    Hinta: {data.price}
                </div>
                <div>
                    Tyyli: {data.type}
                </div>
            </div>
            </div>
        </div>
        </Link>
    )
}
