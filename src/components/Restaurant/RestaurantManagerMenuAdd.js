import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router'
import styles from './RestaurantManagerMenuAdd.module.css';
import {useData} from '../DataProvider';
import axios from 'axios';

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
                                        document.getElementById("imageUrl").value = res.data.image_url
                                    })
                                    .catch((err) => {
                                        throw err;
                                    });



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
                                'category': category,
                                'description': description,
                                'image': image,
                                'price': parseFloat(price)
                            };

                            let route = '/manager/restaurants/'
                                + params.id
                                + '/products';

                            requestPostMenu.request(userJWT, route, newProduct);
                            let stateVarFnc = requestGetMenu.getStateVarFnc();
                            let stateVar = requestGetMenu.getStateVar();

                            // i can either request new data or locally show added data
                            requestGetMenu.request(userJWT, '/manager/restaurants');
                            //requestGetMenu.stateVarFnc([
                            //    ...requestGetMenu.getStateVar(),
                            //    newProduct]);
                    }}>
                        Save product
                    </button>
                </div>
            </div>
        </>
    )
}
