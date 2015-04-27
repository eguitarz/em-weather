var request = require('request')
  , RSVP = require('rsvp')
  , get = RSVP.denodeify(request.get)
  , apiKeys = require('./api-keys')
  , Lazy = require('lazy.js')
  , logger = require('./logger')().logger
  , fixture = require('../fixture')

function getSearch(query, opts) {
  var dasherizedQuery = query.split('-').join(', ').split('_').join(' ')
    , wundergroundQueryUrl = 'http://autocomplete.wunderground.com/aq?query=' + dasherizedQuery
    , limit = (opts && opts.limit) || 1

  return timedGet(wundergroundQueryUrl).then(function(response) {
    var results = JSON.parse(response.body).RESULTS
    return Lazy(results).filter({'type': 'city'}).take(limit).toArray()
  })
}

function fetchPayload(searchResults) {
  var result = searchResults[0]
    , latLon = result.ll.split(' ')
    , latField = latLon[0]
    , lonField = latLon[1]
    , nameField = result.name
    , startAt = parseInt(this.query.start) || Math.floor((new Date).getTime()/1000)
    , endAt = parseInt(this.query.end) || Math.floor((new Date).getTime()/1000)
    , payload = []
    , limit = 50;

  var count = 0;
  console.log('startAt:' + startAt);
  console.log('endAt:' + endAt);
  while (startAt <= endAt && count < limit) {
    payload.push(asJSON(timedGet(buildWeatherHistoryUrl(latField, lonField, startAt))));
    startAt += 86400;
    count += 1;
  }

  return RSVP.all(payload).then(function(history) {return RSVP.hash({
    weatherHistory: history,
    locationName: nameField
  })});

  // return RSVP.hash({
    // weatherConditions: asJSON(timedGet(buildWeatherUrl('conditions', latField, lonField))),
    // weatherForecast: asJSON(timedGet(buildWeatherUrl('forecast10day', latField, lonField))),
    // imageApi: asJSON(timedGet(build500pxUrl(nameField))),
    // weatherHistory: asJSON(timedGet(buildWeatherHistoryUrl(latField, lonField, time))),
    // locationName: nameField
  // })

  function buildWeatherUrl (type, latField, lonField) {
    return 'https://api.forecast.io/forecast/' + apiKeys.forecast + '/' +
        latField + ',' + lonField
  }

  function buildWeatherHistoryUrl (latField, lonField, time) {
    return 'https://api.forecast.io/forecast/' + apiKeys.forecast + '/' +
        latField + ',' + lonField + ',' + time + '?exclude=hourly,flags'
  }

  function build500pxUrl (nameField) {
    var rand = Math.floor((Math.random()*5)+1)
    return 'https://api.500px.com/v1/photos/search?term=' +
           nameField +
           '&only=landscapes&sort=rating&rpp=1&image_size=5&page='+rand+'&consumer_key=' +
           apiKeys.fiveHundredPX
  }

  function asJSON (responsePromise) {
    return responsePromise.then(function (response) {
      return JSON.parse(response.body)
    })
  }
}

function timedGet(url) {
  var beforeGetTS = Date.now()
  return get(url).then(function (r) {
    logger.info("Request to " + url + " took " + (Date.now() - beforeGetTS) + " ms ")
    return r
  })
}

function handleError(e) {
  logger.info("there was an error", e)
}

module.exports = function(app) {
  app.get('/api/weather/:location', function (req, res) {
    logger.info("Request params " + req.params.location);

    if (!apiKeys.fiveHundredPX && !apiKeys.forecast || apiKeys.fixture)
      res.send(fixture);
    else
      getSearch(req.params.location)
      .then(fetchPayload.bind(req))
      .then(res.send.bind(res))
      .catch(handleError)
  });

  app.get('/api/search/:term', function (req, res) {

    if (!apiKeys.forecast || apiKeys.fixture)
      res.send(fixture.search)
    else
      console.log("term: " + req.params.term);
      getSearch(req.params.term, {limit: 5})
      .then(res.send.bind(res))
      .catch(handleError)
  });

}
