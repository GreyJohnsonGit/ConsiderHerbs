 /* Server Side -- Stripe API calls */
 require('dotenv').config();
 const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
 //const DollarFormating = require('../formattingforStripe.js');

 exports.getAllProducts = async function(req,res) {

  const products = await stripe.products.list();
  res.json(products);
 }

 exports.getAllPlans = async function(req,res) {

  const plans = await stripe.plans.list();
  res.json(plans);
 }

 exports.SubscribeCustomer = async function(req,res) {
   const customer = await stripe.customers.create({
      source: req.body.stripeToken,
      email: req.body.customerEmail 
    });
   
   const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{plan: req.body.planId }]
    });
    res.json(subscription);
  }

exports.retrievePriceofPlan = async function(req,res) {
   const plan = await stripe.plans.retrieve(req.params.id);
   res.json(plan.amount);
}