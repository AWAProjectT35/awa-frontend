import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import styles from './RestaurantsManagerManage.module.css';
import {useData} from '../DataProvider';

export default function RestaurantsManagerManage({requestGetRestaurants, requestPostRestaurant, requestPutRestaurant}) {

    const {restaurants, userJWT} = useData();
    const params = useParams();

    console.log('put', requestGetRestaurants)

    let foundRestaurant = false;
    let restaurant = restaurants.find((r) => r.restaurantId == params.id);

    if (typeof restaurant === 'undefined') {
        restaurant = {
            'restaurantName': '',
            'address': '',
            'opens': '',
            'closes': '',
            'image': '',
            'type': 'Casual',
            'priceLevel': 0
        };
    } else {
        foundRestaurant = true;
    }

    const [restaurantName, setRestaurantName] = useState('');
    const [address, setAddress] = useState('');
    const [opens, setOpens] = useState('');
    const [closes, setCloses] = useState('');
    const [image, setImage] = useState('');
    const [type, setType] = useState('Casual');
    const [priceLevel, setPriceLevel] = useState(0);

    const ButtonAddRestaurant = () => {
        return (
            <button
                className = {styles.button}
                onClick = {() => {
                    let newRestaurant = {
                        'restaurantName': restaurantName,
                        'address': address,
                        'opens': opens,
                        'closes': closes,
                        'image': image,
                        'type': type,
                        'priceLevel': parseInt(priceLevel)
                    }
                    requestPostRestaurant.request(userJWT, '/manager/restaurants', newRestaurant);
                    requestGetRestaurants.request(userJWT);
                }}>
                    OK
            </button>
        )
    }

    const ButtonEditRestaurant = () => {
        return (
            <button
                className = {styles.button}
                onClick = {() => {
                    let newRestaurant = {
                        'restaurantName': restaurantName,
                        'address': address,
                        'opens': opens,
                        'closes': closes,
                        'image': image,
                        'type': type,
                        'priceLevel': parseInt(priceLevel)
                    }
                    requestPutRestaurant.request(
                        userJWT,
                        '/manager/restaurants/' + restaurant.restaurantId,
                        newRestaurant);
                    requestGetRestaurants.request(userJWT);
                }}>
                    OK
            </button>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.gridContainer}>
                <div>
                    <div className={styles.info}>
                        <div>
                            Name:
                        </div>
                        <div>
                            {restaurant.restaurantName}
                        </div>
                    </div>
                    <div className={styles.input}>
                        <input
                            type='text'
                            value={restaurantName}
                            onChange={(e) => setRestaurantName(e.target.value)} />
                    </div>
                </div>

                <div>
                    <div className={styles.info}>
                        <div>
                            Address:
                        </div>
                        <div>
                            {restaurant.address}
                        </div>
                    </div>
                    <div className={styles.input}>
                        <input
                            type='text'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)} />
                    </div>
                </div>

                <div>
                    <div className={styles.info}>
                        <div>
                            Opens:
                        </div>
                        <div>
                            {restaurant.opens}
                        </div>
                    </div>
                    <div className={styles.input}>
                        <input
                            type='time'
                            value={opens}
                            onChange={(e) => setOpens(e.target.value)} />
                    </div>
                </div>

                <div>
                    <div className={styles.info}>
                        <div>
                            Closes:
                        </div>
                        <div>
                            {restaurant.closes}
                        </div>
                    </div>
                    <div className={styles.input}>
                        <input
                            type='time'
                            value={closes}
                            onChange={(e) => setCloses(e.target.value)} />
                    </div>
                </div>

                <div>
                    <div className={styles.info}>
                        <div>
                            Image:
                        </div>
                        <div>
                            {restaurant.image}
                        </div>
                    </div>
                    <div className={styles.input}>
                        <input
                            type='url'
                            value={image}
                            onChange={(e) => setImage(e.target.value)} />
                    </div>
                </div>

                <div>
                    <div className={styles.info}>
                        <div>
                            Type:
                        </div>
                        <div>
                            {restaurant.type}
                        </div>
                    </div>
                    <div className={styles.input}>
                        <select
                            name='type'
                            id='cars'
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                                <option value='Casual'>Casual</option>
                                <option value='Fine dining'>Fine dining</option>
                                <option value='Buffet'>Buffet</option>
                                <option value='Fast food'>Fast food</option>
                        </select>
                    </div>
                </div>

                <div>
                    <div className={styles.info}>
                        <div>
                            Price Level:
                        </div>
                        <div>
                            {restaurant.priceLevel}
                        </div>
                    </div>
                    <div className={styles.input}>
                        <input
                            type='range'
                            min='0'
                            max='5'
                            value={priceLevel}
                            onChange={(e) => setPriceLevel(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className={styles.buttons}>
                <Link to='../..'>
                    {(foundRestaurant) ? <ButtonEditRestaurant /> : <ButtonAddRestaurant />}
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
