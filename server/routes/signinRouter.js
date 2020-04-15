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

//returns all Users
// GET: /api/SignIn/
signinRouter.get('/', SignInController.getAll);

// returns one User from username given
signinRouter.get('/:username', SignInController.getUser);

//Updates User
signinRouter.put('/:username/change/:password', SignInController.updatePassword);

module.exports = signinRouter;