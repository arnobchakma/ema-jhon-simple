import React, { createContext, useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Shop from "./Components/Shop/Shop";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Review from "./Components/Review/Review";
import Inventory from "./Components/Inventory/Inventory";
import Notfound from "./Components/Notfound/Notfound";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import LogIn from "./Components/LogIn/LogIn";
import Shipment from "./Components/Shipment/Shipment";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value ={[loggedInUser, setLoggedInUser]}>
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/Shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivateRoute path="/inventory">
            <Inventory></Inventory>
          </PrivateRoute>
          <Route path="/logIn">
            <LogIn/>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment/>
          </PrivateRoute>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetails></ProductDetails>
          </Route>
          <Route path="*">
            <Notfound></Notfound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
