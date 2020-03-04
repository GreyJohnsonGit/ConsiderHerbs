import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import Glossary from "./components/Glossary/Glossary"
import About from "./components/About/About"
import DidYouKnow from "./components/DidYouKnow/DidYouKnow"
import Schedule from "./components/Schedule/Schedule"
import Forum from "./components/Forum/Forum"
import Footer from "./components/Footer/Footer"
import SignIn from "./components/SignIn/SignIn"


import NotFound from "./views/NotFound";
import NavBar from "./components/Header/NavBar";

const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/Glossary" component={Glossary} />
        <Route exact path="/About" component={About} />
        <Route exact path="/DidYouKnow" component={DidYouKnow} />
        <Route exact path="/Forum" component={Forum} />
        <Route exact path="/Schedule" component={Schedule} />
        <Route exact path="/SignIn" component={SignIn} />
      
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route component={NotFound}/>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
