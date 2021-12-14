import { useState, useReducer } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import  { v4 as uuidv4 } from 'uuid';
import  jwt  from 'jsonwebtoken';
import { Context } from './components/Context';

import Header from './components/Header';
import Home from './components/Home';
import Restaurants from './components/Restaurants';
import RestaurantsManager from './components/Restaurant/RestaurantsManager';
import RestaurantsManagerManage from './components/Restaurant/RestaurantsManagerManage';
import RestaurantManagerMenu from './components/Restaurant/RestaurantManagerMenu';
import RestaurantManagerMenuAdd from './components/Restaurant/RestaurantManagerMenuAdd';
import RestaurantManagerProduct from './components/Restaurant/RestaurantManagerProduct';
import { RestaurantMenu } from './components/RestaurantMenu';
import { RestaurantManagerView } from './components/Restaurant/RestaurantManagerView';
import RestaurantManagerOrder from './components/Restaurant/RestaurantManagerOrder';
import { menuData } from './data.menu';
import orders from './data.order.json';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Account from './components/Account/Account';
import Settings from './components/Account/Settings';
import Profile from './components/Account/Profile';
import OrderHistory from './components/Account/OrderHistory';
import CustomerOrder from './components/Account/CustomerOrder';
import Payment from './components/Payment';
import ShoppingCart from './components/ShoppingCart'
import Footer from './components/Footer';

import {useData} from './components/DataProvider';

import {RequestGet, RequestGetRestaurants, RequestPost, RequestPut} from './Tools/requestClasses';


// axios constants
const axios = require('axios').default;


const currencyOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
}

const jwtFromStorage = window.localStorage.getItem("userJWT");

//Adding unique ids to menuData.
// const menuDataIds = menuData.map( data => {
//     return { ...data, id: uuidv4()}
// });


function App() {

    //CONSTS
    const {restaurants, setRestaurants} = useData();

    //State for storing JWT.
    const [userJWT, setUserJWT] = useState(jwtFromStorage);

    //useState for shopping cart
    const [cart, setCart] = useReducer(cartReducer, []);
    
    //Decoded JWT using jsonwebtoken.decoder.
    const jwtDecoded = jwt.decode(userJWT);

    const requestGetRestaurants = new RequestGetRestaurants(restaurants, setRestaurants);

    const requestGetOrders = new RequestGet();
    const requestPutOrders = new RequestPut();

    const requestGetMenu = new RequestGet();
    const requestPostMenu = new RequestPost();

    const requestPostRestaurant = new RequestPost();
    const requestPutRestaurant = new RequestPut();

    const requestPostOrder = new RequestPost();
    const requestGetUsers = new RequestGet();

    const [payment, setPayment] = useState(false);
    //CONSTS END
    
    //FUNCTIONS
    //Getting cart total via .reduce()
    function getTotal(cart) {
        const total = cart.reduce((totalCost, item) => totalCost + item.price, 0);
        return total.toLocaleString(undefined, currencyOptions)
    }

    //Reducer arg function for useReducer()
    function cartReducer(state, action) {
        switch(action.type) {
        case 'add':
            return [...state, action.data];
        case 'remove':
            const productIndex = state.findIndex(item => item.name === action.data.name);
            if(productIndex < 0) {
            return state;
            }
            const update = [...state];
            update.splice(productIndex, 1)
            return update
        case 'empty':
            const empty = [];
            return empty;
        default:
            return state;
        }
    }

    //Function for adding products to cart.
    function add(data) {
        const restaurant = data.restaurantId;
        if(cart.length < 1) {
             setCart({ data, type: 'add' })
        } else {
            let id = cart.length -1;
            if(cart[id].restaurantId != restaurant)
                alert("Cart contains products from multiple restaurants, please empty cart before continuing.");
            else
            setCart({ data, type: 'add' }) 
         
        }
    }
    

    //Function for removing products from cart.
    function remove(data) {
        setCart({ data, type: 'remove' });
    }

    //Function for emptying shopping cart.
    function empty(data) {
        setCart({ data, type: 'empty' });
    }
    //FUNCTIONS ENDS
    //requestRestaurants(getRequestPathRestaurants, Constants.API_ADDRESS, setRestaurants);

    let authRoutes = <>
            <Route path="/login" element={ <Login
                login={ (newJWT) => {
                    setUserJWT(newJWT);
                    window.localStorage.setItem("userJWT", newJWT);
                    requestGetRestaurants.request(newJWT);
                } }
            />} />
            <Route path="/signup" element={ <SignUp />} />
        </>

    if(userJWT != null) {
        authRoutes =  <>
            <Route path='/payment' element={<Payment payment={payment} setPayment={setPayment} />} />
            <Route path='/account' element={ <Account />  }>
                <Route path='settings' element={<Settings />} />
                <Route path='profile' element={<Profile />} />
                <Route path='history'>
                    <Route path='' element={<OrderHistory userJWT={userJWT} />} />
                    <Route path=':id' element={<CustomerOrder />} />
                </Route>
            </Route>
        <Route path="/shoppingcart" element={ <ShoppingCart requestPostOrder={requestPostOrder} setPayment={setPayment} payment={payment} />} />
         
        </>
    }

    // Restaurants routes for customers and non-logged in
    let restaurantsRoutes = <>
            <Route path="/restaurants">
                <Route path="" element={ <Restaurants
                    restaurants={restaurants}
                    /> }/>
                <Route path=":id" element={
                    <RestaurantMenu  
                        restaurants={restaurants}
                        requestGetMenu={requestGetMenu}  /> } />
            </Route>
        </>

    // Restaurants routes for managers
    if (jwtDecoded != null) {
        if (jwtDecoded.role === 'MANAGER') {
            restaurantsRoutes = <>
                <Route path="/restaurants">
                    <Route path="" element={<RestaurantsManager requestGetRestaurants={requestGetRestaurants} /> }/>
                    <Route path=":id"
                        element={<RestaurantManagerView
                            requestGetRestaurants={requestGetRestaurants}
                            requestGetOrders={requestGetOrders} />
                    }>
                        <Route path=":orderId"
                            element={<RestaurantManagerOrder
                                requestGetRestaurants={requestGetRestaurants}
                                requestGetOrders={requestGetOrders}
                                requestPutOrders={requestPutOrders} />} />
                    </Route>

                    <Route path="/restaurants/manage">
                        <Route
                            path=""
                            element={<RestaurantsManagerManage
                                requestGetRestaurants={requestGetRestaurants} 
                                requestPostRestaurant={requestPostRestaurant}
                                requestPutRestaurant={requestPutRestaurant} />} />
                        <Route
                            path=":id"
                            element={<RestaurantsManagerManage
                                requestGetRestaurants={requestGetRestaurants}
                                requestPostRestaurant={requestPostRestaurant}
                                requestPutRestaurant={requestPutRestaurant} />} />
                    </Route>

                    <Route path="/restaurants/menu/:id"
                        element={<RestaurantManagerMenu
                            requestGetMenu={requestGetMenu} />}
                    >
                        <Route path="new"
                            element={<RestaurantManagerMenuAdd
                                requestPostMenu={requestPostMenu}
                                requestGetMenu={requestGetMenu} />} />
                        <Route path=":productId"
                            element={<RestaurantManagerProduct
                                requestGetMenu={requestGetMenu} /> } />
                    </Route>
                </Route>
            </>
        }
    }


  return (
    <Context.Provider value={{
        jwtDecoded, add,  remove, empty,
        getTotal,  cart,  setCart, currencyOptions,
        userJWT, restaurants
    }}>
        <BrowserRouter>
            <Header userJWT={userJWT != null} logOut={() => {
                setUserJWT(null);
                window.localStorage.removeItem("userJWT");
                requestGetRestaurants.request(null);
            }} />

            <Routes>
                <Route path="/" element={ <Home /> } />
                    { authRoutes }
                    { restaurantsRoutes }
                <Route path="*" element={ <Home /> } />
            </Routes>

            {/* <Footer /> */}
        </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
