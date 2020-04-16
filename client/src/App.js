import React, { useState } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./components/Home/Home";
import Glossary from "./components/Glossary/Glossary"
import About from "./components/About/About"
import Schedule from "./components/Schedule/Schedule"
import Forum from "./components/Forum/Forum"
import Products from "./components/Products/Products"
import Footer from "./components/Footer/Footer"
import SignIn from "./components/SignIn/SignIn"
import SignUp from "./components/SignIn/SignUp"
import Profile from "./components/Profile/Profile"
import DidYouKnow from './components/Forum/forum_components/DidYouKnow.js';


import {CookiesProvider, useCookies} from 'react-cookie';
import NotFound from "./views/NotFound";
import NavBar from "./components/Header/NavBar";



const App = () => {
  const [cookies, ] = useCookies([]);
  const [user, setUser] = useState({
    userLevel: 0,
    session: {}
  });
  if(cookies.user) {
    user.userLevel = cookies.user.userLevel;
    user.session = cookies.user.session;
  }

  return (
    <CookiesProvider>
      <div id="page-container">  
        <div className="content">
          <NavBar user={user} setUser={setUser}/>
          <div className = "spacer" > &nbsp; </div>
          <Switch>
            <Route exact path="/Home"     render={(props) => <Home {...props}       user={user} setUser={setUser}/>} />
            <Route exact path="/Glossary" render={(props) => <Glossary {...props}   user={user} setUser={setUser}/>} />
            <Route exact path="/About"    render={(props) => <About {...props}      user={user} setUser={setUser}/>} />
            <Route path="/Forum"          render={(props) => <Forum {...props}      user={user} setUser={setUser}/>} />
            <Route path="/DidYouKnow"     render={(props) => <DidYouKnow {...props} user={user} setUser={setUser}/>} />
            <Route exact path="/Schedule" render={(props) => <Schedule {...props}   user={user} setUser={setUser}/>} />
            <Route exact path="/Products" render={(props) => <Products {...props}   user={user} setUSer={setUser}/>} />
            <Route exact path="/SignIn"   render={(props) => <SignIn {...props}     user={user} setUser={setUser}/>} />
            <Route exact path="/SignUp"   render={(props) => <SignUp {...props}     user={user} setUser={setUser}/>} />
            <Route exact path="/Profile"  render={(props) => <Profile {...props}    user={user} setUser={setUser}/>} />
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
