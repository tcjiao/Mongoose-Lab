const Flight = require('../models/flight');
const Ticket = require('../models/ticket');


module.exports = {
    new: newFlight,
    create,
    index,
    show
  };

  function newFlight(req, res) {
    res.render('flights/new', {errorMsg:''})
  }


//   async function show(req, res) {
//     const flight = await flight.findById(req.params.id).populate('flight');
//     const tickets = await Performer.find({ _id: { $nin: flight.flight } }).sort('name');
//     res.render('flights/show', { title: 'Flights Info', flight, tickets });
//   }

  async function show(req, res) {
    try {
      const flight = await Flight.findById(req.params.id);
      const tickets = await Ticket.find({ flight: flight._id }).populate('flight');
      res.render('flights/show', { flight: flight, tickets: tickets });
    } catch (err) {
      console.log(err);
      res.render('error', { message: 'An error occurred', error: err });
    }
  }

async function index(req, res) {
    const allFlights = await Flight.find({})
    console.log(allFlights)
    res.render('flights/index', {flights: allFlights})
  }

  async function create(req, res) {
    req.body.nowShowing = !!req.body.nowShowing;
  
    if (req.body.cast) {
      req.body.cast = req.body.cast.trim();
      if (req.body.cast) req.body.cast = req.body.cast.split(/\s*,\s*/);
    }
  
    try {
      await Flight.create(req.body);
      res.redirect('/flights');
    } catch (err) {
      console.log(err);
      res.render('flights', { errorMsg: err.message });
    }
  }