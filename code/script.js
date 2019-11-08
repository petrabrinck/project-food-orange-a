const apiKey = "c3c54d8037eb79d54e15629d7d4d607e";
const CityId = 280;
const CousineId = 162;
let restaurants = [];
const list = document.getElementById("restaurants")

const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${CityId}&entity_type=city&cuisines=${CousineId}`;


//Fetch that creates let = restaurants and invoke function to show all restaurants (renderRestaurants)
const fetchRestaurants = () => {

    fetch(url, { headers: { "user-Key": apiKey } })
        .then(res => res.json())
        .then(json => {
            restaurants = json.restaurants
            renderRestaurants("all")
        })
}

//function that deside which info to show
const renderRestaurantInfo = (restaurant) => {
    return `<li class="restaurantCard">${restaurant.name} <br> 
         Opening Hours: ${restaurant.timings}<br> 
        Address: ${restaurant.location.address} <br> 
        Phone: ${restaurant.phone_numbers}<br> 
        Rating:${restaurant.user_rating.aggregate_rating}<br>
        Average cost for two: ${restaurant.average_cost_for_two} $<br> 
        Price range: ${restaurant.price_range}<br> 
        ${renderPhotos(restaurant)}
        
        </li>`
}

//function to see if pictures are avalible or not 
const renderPhotos = (restaurant) => {
    if (restaurant.photos) {
        return `<img src="${restaurant.photos[0].photo.thumb_url}" />`
    } else {
        return ` <p>Pic not avalible</p>`
    }
}

// function to show all restaurants (list=show all restaurants with id = restaurants) and filter priceRange 
const renderRestaurants = (priceRange1, priceRange2) => {
    console.log("priceRange1", priceRange1)
    console.log("priceRange2", priceRange2)

    list.innerHTML = ''
    restaurants.forEach((item) => {
        const { restaurant } = item


        if (priceRange1 === "all" || restaurant.price_range === priceRange1 || restaurant.price_range === priceRange2) {
            list.innerHTML += renderRestaurantInfo(restaurant)
        } else {
            return
        }
    })
}


//invoke fetch from API to store the restaurant array in let restaurant 
fetchRestaurants()

//$buttons to invoke renderRestaurants with priceRange arguments
document.getElementById("cheap").addEventListener('click', () => {
    renderRestaurants(1, 2)
})

document.getElementById("medium").addEventListener('click', () => {
    renderRestaurants(3)
})

document.getElementById("expensive").addEventListener('click', () => {
    renderRestaurants(4, 5)
})

document.getElementById("resetPriceRange").addEventListener('click', () => {
    renderRestaurants("all")
})

