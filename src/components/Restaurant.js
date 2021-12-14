import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Restaurant.module.css'



export default function Restaurant({data}) {

  
  
  return (
    <Link to={'' + data.restaurantId} style={{ textDecoration: 'none' }} >
      <div className={styles.box}>
        <div key={data.restaurantId}>
          <img src={data.image} alt=""/>

          <div style={{fontWeight: "900"}} className={styles.title}>
            {data.restaurantName}
          </div>

          <div className={styles.restInfo}>
            <div>
              {data.address}
            </div>
            <div>
              Avoinna: {data.opens} - {data.closes}
            </div>
            <div>
              Hinta: {data.priceLevel}
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
