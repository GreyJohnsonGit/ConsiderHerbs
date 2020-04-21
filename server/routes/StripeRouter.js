const express = require('express');
const StripeRouter = express.Router();
const STRIPE_API = require('../controllers/stripe-functions.js');

//Begins the payment process for a customer by creating a new customer object and links them to a subscription
// The request body should hold the id of the plan that the customer is buying as well as the customer's email and a specific stripeToken for them.
// GET: /api/Stripe/Subscribe
StripeRouter.post('/Subscribe', STRIPE_API.SubscribeCustomer);


// Returns the price of a Plan from given id
// GET: /api/Stripe/:id/getPrice
StripeRouter.get('/:id/getPrice', STRIPE_API.retrievePriceofPlan);

// Returns all the Products made in Stripe
// GET: /api/Stripe/Products
StripeRouter.get('/Products', STRIPE_API.getAllProducts);

// Returns all the Plans made in Stripe
// GET: /api/Stripe/Plans
StripeRouter.get('/Plans', STRIPE_API.getAllPlans);

module.exports = StripeRouter;