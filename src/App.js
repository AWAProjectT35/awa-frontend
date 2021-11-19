import { useState, useMemo } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import  { v4 as uuidv4 } from 'uuid';
import { UserContext } from './UserContext';

import Header from './components/Header';
import Home from './components/Home';
import Restaurants from './components/Restaurants';
import RestaurantMenu from './components/RestaurantMenu';
import { menuData } from './data.menu';
import { restaurantData } from './data.restaurants';
import Login from './components/Login';
import Footer from './components/Footer';


function App() {

    const [user, setUser] = useState(null);

    const value = useMemo(() => ({ user, setUser}), [user, setUser]);

    const restaurants = restaurantData.map( data => {
        return { ...data, id: uuidv4()}
    });

    const menuDataIds = menuData.map( data => {
        return { ...data, id: uuidv4()}
    });

    return (
        <BrowserRouter>
        <UserContext.Provider value={value}>
            <Header />

            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/restaurants">
                <Route path="" element={<Restaurants restaurants={restaurants} />} />
                <Route path=":id" element={
                <RestaurantMenu restaurants={restaurants} menuData={menuDataIds} />
                } />
            </Route>
            </Routes>

            <Footer />
        </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
