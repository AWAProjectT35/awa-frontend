import React, { useState } from 'react';
import { useParams } from 'react-router'
import styles from './RestaurantManagerMenuAdd.module.css';
import {useData} from '../DataProvider';
import axios from 'axios';
import Constants from '../Constants.json';

const axios2 = require('axios').default;

export default function RestaurantManagerMenuAdd({requestPostMenu, requestGetMenu}) {

    const {userJWT} = useData();
    const params = useParams();

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');

    return (
        <>
            <div className={styles.container}>
                <div className={styles.foodName}>New Product</div>

                <div className={styles.tag}>Name:</div>
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}/>
                </div>

                <div className={styles.tag}>Category:</div>
                <div>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}/>
                </div>

                <div className={styles.tag}>Description:</div>
                <div>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}/>
                    {/* <textarea
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}/> */}
                </div>

                <div className={styles.tag}>Image:</div>
                <div>
                    <input
                        id = "imageUrl"
                        type="url"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}/>
                        <form id="imageUpload">
                            <input type="file" id="myFile" name="file"></input>
                        </form>
                            <button type="button" onClick={() => {
                                let files = document.getElementById("myFile")
                                if (files.files.length !== 0) {
                                    let element = document.getElementById("imageUpload")
                                    let data = new FormData(element)
                                    console.log(data)
                                    axios({
                                        method: "post",
                                        url: "https://awa-2021-t35.herokuapp.com/manager/image",
                                        data: data,
                                        headers: {'Authorization': 'Bearer ' + userJWT}
                                    })
                                        .then((res) => {
                                            console.log(res.data.image_url)
                                            setImage(res.data.image_url)
                                        })
                                        .catch((err) => {
                                            throw err;
                                        });
                                }
                            }}>upload</button>
                </div>

                <div className={styles.tag}>Price:</div>
                <div>
                    <input
                        type="number"
                        value={price}
                        min="0.01"
                        step="0.01"
                        onChange={(e) => setPrice(e.target.value)}/>
                </div>

                <div className={styles.saveButtonBox}>
                    <button
                        // className={styles.buttonSave}
                        onClick={() => {
                            let newProduct = {
                                'name': name,
                                'description': description,
                                'price': parseFloat(price),
                                'image': image,
                                'category': category
                            };

                            let route = '/manager/restaurants/'
                                + params.id
                                + '/products';

                            let axiosHeaders = {'headers': {'Authorization': 'Bearer ' + userJWT}};

                            console.log('new', newProduct)

                            axios2.post(Constants.API_ADDRESS + route, newProduct, axiosHeaders)
                                .then((response) => {
                                    console.log('data sent ', response.data);
                                    requestGetMenu.request(userJWT, '/manager/restaurants');
                                })
                                .catch((error) => {
                                    console.log(error);
                                })

                    }}>
                        Save product
                    </button>
                </div>
            </div>
        </>
    )
}
