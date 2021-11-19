import { React } from 'react'
import { useParams } from 'react-router'


export default function RestaurantMenu({menuData, restaurants}) {
    const index = useParams();

    const restaurant = restaurants.find(restaurant => restaurant.id === index.id );
    if ( restaurant == null) {
        return <div>No matching restaurant</div>
    }

    const getMenu = menuData.filter(menu => menu.restaurant === restaurant.name)

    console.log(restaurant);
    console.log(getMenu);


    return (
        <div >
        <h1>{restaurant.name} </h1>
        {getMenu.map((data, key) => {
            return (
                <div key={data.id}>
                <div>
                    {data.name}
                </div>
                <div>
                    {data.price}$
                </div>
                </div>
            )})}
        </div>
    )
}
