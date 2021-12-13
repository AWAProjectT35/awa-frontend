import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {GetRestaurant} from '../Tools';
import styles from './RestaurantsManagerManage.module.css';

export default function RestaurantsManagerManage({restaurants}) {

    let foundRestaurant = GetRestaurant(restaurants);
    let addingNewRestaurant;

    const restaurant = {
        name: "",
        address: "",
        opens: "",
        closes: "",
        image: "",
        price: ""}

    if (foundRestaurant === null) {
        addingNewRestaurant = true;
    } else {
        addingNewRestaurant = false;
        Object.keys(restaurant).forEach(function(key){ restaurant[key] = foundRestaurant[key] });
    }

    const [name, setName] = useState(restaurant.name);
    const [address, setAddress] = useState(restaurant.address);
    const [opens, setOpens] = useState(restaurant.opens);
    const [closes, setCloses] = useState(restaurant.closes);
    const [image, setImage] = useState(restaurant.image);
    const [type, setType] = useState(restaurant.type);
    const [price, setPrice] = useState(restaurant.price);

    const ButtonAddRestaurant = () => {
        return (
            <button
                className = {styles.button}
                onClick = {() => alert("add restaurant")}>
                    OK
            </button>
        )
    }

    const ButtonEditRestaurant = () => {
        return (
            <button
                className = {styles.button}
                onClick = {() => alert("edit restaurant")}>
                    OK
            </button>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.gridContainer}>
                <div>
                    Name:
                </div>
                <div>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </div>

                <div>
                    Address:
                </div>
                <div>
                    <input
                        type='text'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)} />
                </div>

                <div>
                    Opens:
                </div>
                <div>
                    <input
                        type='time'
                        value={opens}
                        onChange={(e) => setOpens(e.target.value)} />
                </div>

                <div>
                    Closes:
                </div>
                <div>
                    <input
                        type='time'
                        value={closes}
                        onChange={(e) => setCloses(e.target.value)} />
                </div>

                <div>
                    Image:
                </div>
                <div>
                    <input
                        type='url'
                        value={image}
                        onChange={(e) => setImage(e.target.value)} />
                </div>

                <div>
                    Type:
                </div>
                <div>
                    <select
                        name='type'
                        id='cars'
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                            <option value='casual'>Casual</option>
                            <option value='fine_dining'>Fine dining</option>
                            <option value='buffet'>Buffet</option>
                            <option value='fast_food'>Fast food</option>
                    </select>
                </div>

                <div>
                    Price:
                </div>
                <div>
                    <input
                        type='range'
                        min='0'
                        max='5'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)} />
                </div>
            </div>

            <div className={styles.buttons}>
                <Link to='../..'>
                    {(addingNewRestaurant) ? <ButtonAddRestaurant /> : <ButtonEditRestaurant />}
                </Link>

                <Link to='../..'>
                    <button className={styles.button}>
                        Cancel
                    </button>
                </Link>
            </div>
        </div>
    )
}
