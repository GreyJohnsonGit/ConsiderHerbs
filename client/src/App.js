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
import { CookiesProvider } from 'react-cookie'
import NotFound from "./views/NotFound";
import NavBar from "./components/Header/NavBar";



const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <CookiesProvider>
      <div id="page-container">  
        <div className="content">
          <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
          <div className = "spacer" > &nbsp; </div>
          <Switch>
            <Route exact path="/Home" render={(props) => <Home {...props} />} />
            <Route exact path="/Glossary" render={(props) => <Glossary {...props} />} />
            <Route exact path="/About" render={(props) => <About {...props} />} />
            <Route path="/Forum" render={(props) => <Forum {...props} />} />
            <Route exact path="/Schedule" render={(props) => <Schedule {...props} />} />
            <Route exact path="/SignIn" render={(props) => <SignIn {...props} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
            <Route exact path="/SignUp" render={(props) => <SignUp {...props} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
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
