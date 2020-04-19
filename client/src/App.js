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


import {CookiesProvider, useCookies, Cookies} from 'react-cookie';
import NotFound from "./views/NotFound";
import NavBar from "./components/Header/NavBar";

const App = () => {
  const [userState, setUserState] = useState(1);
  const [cookies, setCookies] = useCookies(['user'])
  const toggleUserState = () => {
    setUserState(!userState);
  }

  if(!cookies.user) {
    setCookies('user', {
      user:{
        userLevel: 0
      }
    },
    {
      path: '/'
    })
  }

  return (
    <CookiesProvider>
      <div id="page-container">  
        <div className="content">
          <NavBar  toggleUserState={toggleUserState}/>
          <div className = "spacer" > &nbsp; </div>
          <Switch>
            <Route exact path="/Home"     render={(props) => <Home {...props}        toggleUserState={toggleUserState}/>} />
            <Route exact path="/Glossary" render={(props) => <Glossary {...props}    toggleUserState={toggleUserState}/>} />
            <Route exact path="/About"    render={(props) => <About {...props}       toggleUserState={toggleUserState}/>} />
            <Route path="/Forum"          render={(props) => <Forum {...props}       toggleUserState={toggleUserState}/>} />
            <Route path="/DidYouKnow"     render={(props) => <DidYouKnow {...props}  toggleUserState={toggleUserState}/>} />
            <Route exact path="/Schedule" render={(props) => <Schedule {...props}    toggleUserState={toggleUserState}/>} />
            <Route exact path="/Products" render={(props) => <Products {...props}    toggleUserState={toggleUserState}/>} />
            <Route exact path="/SignIn"   render={(props) => <SignIn {...props}      toggleUserState={toggleUserState}/>} />
            <Route exact path="/SignUp"   render={(props) => <SignUp {...props}      toggleUserState={toggleUserState}/>} />
            <Route exact path="/Profile"  render={(props) => <Profile {...props}     toggleUserState={toggleUserState}/>} />
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
