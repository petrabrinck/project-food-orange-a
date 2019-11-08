const apiKey = "c3c54d8037eb79d54e15629d7d4d607e";
const CityId = 280;
const CousineId = 162;

const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${CityId}&entity_type=city&cuisines=${CousineId}`;

fetch(url, { headers: { "user-Key": apiKey } })
    .then(res => res.json())
    .then(json => {
        console.log(json);
        json.restaurants.forEach(resto => {
            console.log(resto.restaurant.name);
            document.getElementById("restaurants").innerHTML += `
        <li class="restaurantCard">${resto.restaurant.name} <br> Opening Hours: ${
                resto.restaurant.timings
                }<br> address: ${resto.restaurant.location.address} <br> ${
                resto.restaurant.phone_numbers
                }<br>${resto.restaurant.has_table_booking} <br> rating:${
                resto.restaurant.user_rating.aggregate_rating
                }${resto.restaurant.has_awargae_cost_for_two}<br> ${
                resto.restaurant.has_online_delivery
                }${resto.restaurant.price_range}<img src=${
                resto.restaurant.photos[0].photo.thumb_url
                }  </li>`;
        });
    });