var unirest = require("unirest");

const geocode = (address, callback) => {
    unirest.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamVldHNvbmkiLCJhIjoiY2thZ3BuaHV6MDhybzJzb3lxM3NyOGxxdyJ9.cPrPpXaGF0ffgRy034oiKw&limit=1')
        .then((res) => {
            callback({
                latitude: JSON.parse(res.raw_body).features[0].center[1],
                longitude: JSON.parse(res.raw_body).features[0].center[0],
                location: JSON.parse(res.raw_body).features[0].place_name
            })
        })
}
module.exports = geocode
