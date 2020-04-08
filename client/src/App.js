import React, { useState } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./components/Home/Home";
import Glossary from "./components/Glossary/Glossary"
import About from "./components/About/About"
import Schedule from "./components/Schedule/Schedule"
import Forum from "./components/Forum/Forum"
import Footer from "./components/Footer/Footer"
import SignIn from "./components/SignIn/SignIn"
import SignUp from "./components/SignIn/SignUp"
import DidYouKnow from './components/Forum/forum_components/DidYouKnow.js';


import { CookiesProvider } from 'react-cookie';
import NotFound from "./views/NotFound";
import NavBar from "./components/Header/NavBar";



const App = () => {
	const [user, setUser] = useState({
		isLoggedIn: false,
		userLevel: 0,
		username: 'Anon'
	});

  return (
    <CookiesProvider>
      <div id="page-container">  
        <div className="content">
          <NavBar user={user} setUser={setUser}/>
          <div className = "spacer" > &nbsp; </div>
          <Switch>
            <Route exact path="/Home"     render={(props) => <Home {...props}       user={user} />} />
            <Route exact path="/Glossary" render={(props) => <Glossary {...props}   user={user} />} />
            <Route exact path="/About"    render={(props) => <About {...props}      user={user} />} />
            <Route path="/Forum"          render={(props) => <Forum {...props}      user={user} />} />
            <Route path="/DidYouKnow"     render={(props) => <DidYouKnow {...props} user={user} />} />
            <Route exact path="/Schedule" render={(props) => <Schedule {...props}   user={user} />} />
            <Route exact path="/SignIn"   render={(props) => <SignIn {...props}     user={user} setUser={setUser}/>} />
            <Route exact path="/SignUp"   render={(props) => <SignUp {...props}     user={user} setUser={setUser}/>} />
            <Route exact path="/">
              <Redirect to="/Home" />
            </Route>
            <Route component={NotFound}/>
          </Switch>
        </div>
        <Footer />
      </div>
    </CookiesProvider>
  );
}

export default App;
