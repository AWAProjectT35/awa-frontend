import { useState, useReducer } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import  { v4 as uuidv4 } from 'uuid';
import  jwt  from 'jsonwebtoken';
import { JWTContext } from './components/JWTContext';


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

const jwtFromStorage = window.localStorage.getItem("userJWT");

function App() {

    //CONSTS

    //State for storing JWT.
    const [userJWT, setUserJWT] = useState(jwtFromStorage);

    //Decoded JWT using jsonwebtoken.decoder.
    const jwtDecoded = jwt.decode(jwtFromStorage);

    //Adding unique ids to restaurantData.
    const restaurants = restaurantData.map( data => {
    return { ...data, id: uuidv4()}
    });

    //Adding unique ids to menuData.
    const menuDataIds = menuData.map( data => {
        return { ...data, id: uuidv4()}
    });

    //CONSTS END

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

    
  
  return (
    <JWTContext.Provider value={jwtDecoded}>
    <BrowserRouter>
      
        <Header userJWT={userJWT != null} logOut={() => {
            setUserJWT(null)
            window.localStorage.removeItem("userJWT");
        }} />
        <Routes>
            <Route path="/" element={ <Home /> } />
            
                { authRoutes }
                <Route path="/public/restaurants">
                    <Route path="" element={ <Restaurants restaurants={restaurants} /> }/>
                    <Route path=":id" element={
                        <RestaurantMenu  restaurants={restaurants} menuData={menuDataIds} />
                    } />
                </Route>

                <Route path="/manager/restaurants">
                    <Route path="" element={<RestaurantsManager restaurants={restaurants} /> }/>
                    <Route
                        path=":id"
                        element={<RestaurantManagerView
                            restaurants={restaurants}
                            menuData={menuDataIds}
                            orders={orders} />
                    }>
                        <Route
                            path=":orderId"
                            element={<RestaurantManagerOrder
                                restaurants={restaurants}
                                menuData={menuDataIds}
                                orders={orders} />}
                        />
                    </Route>

                    <Route path="/manager/restaurants/manage">
                        <Route
                            path=""
                            element={<RestaurantsManagerManage
                                restaurants={restaurants} />}
                        />
                        <Route
                            path=":id"
                            element={<RestaurantsManagerManage
                                restaurants={restaurants}
                                menuData={menuDataIds} />}
                        />
                    </Route>

                    <Route
                        path="/manager/restaurants/menu/:id"
                        element={<RestaurantManagerMenu
                            restaurants={restaurants}
                            menuData={menuDataIds} />}
                    >
                        <Route path="new" element={<RestaurantManagerMenuAdd />} />
                        <Route
                            path=":productId"
                            element={<RestaurantManagerProduct
                                restaurants={restaurants}
                                menuData={menuDataIds} /> }
                        />
                    </Route>
                </Route>

                <Route path="*" element={ <Home /> } />
            </Routes>

        {/* <Footer /> */}
    </BrowserRouter>
    </JWTContext.Provider>
  );
}

export default App;
