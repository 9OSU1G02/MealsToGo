const url = require("url");
const { mocks: placesMock, addMockImages } = require("./mock/index");
module.exports.placesRequest = (req, res) => {
  const { location } = url.parse(req.url, true).query;
  const data = placesMock[location];
  if (data) {
    data.results = data.results.map(addMockImages);
  }
  res.json(data)
};
