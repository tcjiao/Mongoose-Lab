const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
  new: newTicket,
  create
};


// async function newTicket(req, res) {
//   //Sort performers by their name
//   const tickets = await Ticket.find({}).sort('name');
//   res.render('tickets/new', { title: 'Add Ticket', tickets });
// }

async function newTicket(req, res) {
  const flightId = req.params.id;
  try {
    const flight = await Flight.findById(flightId);
    const tickets = await Ticket.find({}).sort('name');
    res.render('tickets/new', { title: 'Add Ticket', flight, tickets });
  } catch (err) {
    console.log(err);
    res.render('error');
  }
}

// async function create(req, res) {
//   const flight = await Flight.findById(req.params.id);
//   req.body.born += 'T00:00';
//   try {
//     await Ticket.create(req.body);
//   } catch (err) {
//     console.log(err);
//   }
//   res.redirect(`/flights/${flight._id}`);
// }

async function create(req, res) {
  const flight = await Flight.findById(req.params.id);
  try {
    await Ticket.create(req.body);
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/flights/${flight._id}`);
}