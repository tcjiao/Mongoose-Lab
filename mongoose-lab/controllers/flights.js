const Flight = require('../models/flight');

module.exports = {
    new: newFlight,
    create,
    index
  };

  function newFlight(req, res) {
    res.render('flights/new', {errorMsg:''})
  }

async function index(req, res) {
    const allFlights = await Flight.find({})
    console.log(allFlights)
    res.render('flights/index', {flights: allFlights})
  }

  async function create(req, res) {
    req.body.nowShowing = !!req.body.nowShowing;
    req.body.cast = req.body.cast.trim();
    if (req.body.cast) req.body.cast = req.body.cast.split(/\s*,\s*/);
    try {
      await Movie.create(req.body);
      res.redirect('/flights');
    } catch (err) {
      console.log(err);
      res.render('flights', { errorMsg: err.message });
    }
  }