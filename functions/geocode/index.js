const {locations: locationsMock} = require("./geocode.mock");
const url = require("url");

module.exports.geocodeRequest = (req, res) => {
    const {city} = url.parse(req.url, true).query;
    const locationMock = locationsMock[city.toLocaleLowerCase()];
    res.json(locationMock)
};