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
import { restaurantData } from './data.restaurants';
import orders from './data.order.json';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Account from './components/Account';
import ShoppingCart from './components/ShoppingCart'
import Footer from './components/Footer';

const currencyOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
}

const jwtFromStorage = window.localStorage.getItem("userJWT");

//Adding unique ids to menuData.
const menuDataIds = menuData.map( data => {
    return { ...data, id: uuidv4()}
});

function App() {

    //CONSTS

    //State for storing JWT.
    const [userJWT, setUserJWT] = useState(jwtFromStorage);

    //useState for shopping cart
    const [cart, setCart] = useReducer(cartReducer, []);  

    //Decoded JWT using jsonwebtoken.decoder.
    const jwtDecoded = jwt.decode(userJWT);

    //Adding unique ids to restaurantData.
    const restaurants = restaurantData.map( data => {
        return { ...data, id: uuidv4()}
        });
    

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
        const restaurant = data.restaurant;
        if(cart.length < 1) {
             setCart({ data, type: 'add' })
        } else {
            let id = cart.length -1;
            if(cart[id].restaurant != restaurant)
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

    let authRoutes = <>
            <Route path="/login" element={ <Login login={ (newJWT) => {
                setUserJWT(newJWT)
                window.localStorage.setItem("userJWT", newJWT)
                } }/>} />
            <Route path="/signup" element={ <SignUp />} />
        </>

    if(userJWT != null) {
        authRoutes =  <>
        <Route path="/account" element={ <Account />  } />
        <Route path="/shoppingcart" element={ <ShoppingCart />} />
        </>
    }

    // Restaurants routes for customers and non-logged in
    let restaurantsRoutes = <>
            <Route path="/restaurants">
                <Route path="" element={ <Restaurants restaurants={restaurants} /> }/>
                <Route path=":name" element={
                    <RestaurantMenu  restaurants={restaurants} menuData={menuDataIds}  /> } />
            </Route>
        </>

    // Restaurants routes for managers
    if (jwtDecoded != null) {
        if (jwtDecoded.role === 'MANAGER') {
            restaurantsRoutes = <>
                <Route path="/restaurants">
                    <Route path="" element={<RestaurantsManager restaurants={restaurants} /> }/>
                    <Route path=":id"
                        element={<RestaurantManagerView
                            restaurants={restaurants}
                            menuData={menuDataIds}
                            orders={orders} />
                    }>
                        <Route path=":orderId"
                            element={<RestaurantManagerOrder
                                restaurants={restaurants}
                                menuData={menuDataIds}
                                orders={orders} />} />
                    </Route>

                    <Route path="/restaurants/manage">
                        <Route
                            path=""
                            element={<RestaurantsManagerManage
                                restaurants={restaurants} />} />
                        <Route
                            path=":id"
                            element={<RestaurantsManagerManage
                                restaurants={restaurants}
                                menuData={menuDataIds} />} />
                    </Route>

                    <Route path="/restaurants/menu/:id"
                        element={<RestaurantManagerMenu
                            restaurants={restaurants}
                            menuData={menuDataIds} />}
                    >
                        <Route path="new" element={<RestaurantManagerMenuAdd />} />
                        <Route path=":productId"
                            element={<RestaurantManagerProduct
                                restaurants={restaurants}
                                menuData={menuDataIds} /> } />
                    </Route>
                </Route>
            </>
        }
    }


  return (
    <Context.Provider value={{
        jwtDecoded, add,  remove, empty,
         getTotal,  cart,  setCart, currencyOptions
    }}>
        <BrowserRouter>
            <Header userJWT={userJWT != null} logOut={() => {
                setUserJWT(null)
                window.localStorage.removeItem("userJWT");
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
