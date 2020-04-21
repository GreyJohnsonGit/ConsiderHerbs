const express = require('express'); 

const SignInController = require('../controllers/SignInController.js');

const signinRouter = express.Router();

signinRouter.options('/(.+)', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

//Login Route
signinRouter.post('/SignIn/', SignInController.signIn);

//Sign Up Route
signinRouter.post('/SignUp/', SignInController.signUp);

//Verify SessionID
//signinRouter.post('/Verify/', SignInController.verify);

//Logout
//signinRouter.post('/Logout/', SignInController.logout);

//Refresh Session
//signinRouter.post('/Refresh/', SignInController.refresh);

//returns all Users
// GET: /api/SignIn/
signinRouter.get('/', SignInController.getAll);

// returns one User from username given
signinRouter.get('/:username', SignInController.getUser);

//Updates User
signinRouter.post('/ChangePassword/', SignInController.updatePassword);

signinRouter.post('/ToggleSubscribe', SignInController.toggleSubscribe);

signinRouter.post('/ChangeLevel', SignInController.updateUserLevel);

module.exports = signinRouter;