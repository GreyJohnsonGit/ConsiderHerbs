const express = require('express'); 

const SignInController = require('../controllers/SignInController.js');

const signinRouter = express.Router();

signinRouter.post('/', (req, res, next) => {next();});

//Login Route
signinRouter.post('/SignIn/', SignInController.signIn);

//Sign Up Route
signinRouter.post('/SignUp/', SignInController.signUp);

module.exports = signinRouter;