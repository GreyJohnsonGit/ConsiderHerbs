const express = require('express'); 

const SignInController = require('../controllers/SignInController.js');

const signinRouter = express.Router();

signinRouter.post('/', (req, res, next) => {next();});

//Login Route
signinRouter.post('/SignIn/', SignInController.signIn);

//Sign Up Route
signinRouter.post('/SignUp/', SignInController.signUp);

//Verify SessionID
signinRouter.post('/Verify/', SignInController.verify);

//Logout
signinRouter.post('/Logout/', SignInController.logout);

//Refresh Session
signinRouter.post('/Refresh/', SignInController.refresh);

module.exports = signinRouter;