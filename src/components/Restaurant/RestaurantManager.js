import React from 'react'
import { Link } from 'react-router-dom'
import styles from './RestaurantManager.module.css'


export default function Restaurant({data}) {
          //<img src={data.image} alt=""/>
          /*<div alt={data.image} style={{
            backgroundColor: "lightblue",
            backgroundImage: "url(" + data.image + ")",
            textAlign: "right",
            width: "225px",
            height: "225px"
          }}>*/

  return (
    <div className={styles.box}>
      <div key={data.id} style={{position: 'relative'}}>
        <Link to={data.id } style={{ textDecoration: 'none' }} >
          <img src={data.image} alt=""/>
        </Link>

        <Link to={"manage/" + data.id}>
          <button className={styles.buttonEdit}>
            E
          </button>
        </Link>

        <Link to={data.id }>
          <div className={styles.title}>
            {data.name}
          </div>

          <div className={styles.marginDiv} />
        </Link>

        <Link to={"menu/" + data.id}>
          <button className={styles.buttonMenu}>
            Menu
          </button>
        </Link>

        <Link to={data.id}>
          <div className={styles.marginDiv} />

          <div className={styles.restInfo}>
            <div>
              Orders: X
              <br />
              New Orders: Y
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
