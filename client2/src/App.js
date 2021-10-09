import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Buy from "./components/Buy";
import Sale from "./components/Sale";
import Size from "./components/Size";
import Product from "./components/Product";
import Customer from "./components/Customer";
import Register from "./components/Register";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import Buydetail from "./components/Buydetail";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/customer">
            <Customer />
          </Route>
          <Route path="/customer/:id">
            <Customer />
          </Route>
          <Route path="/product">
            <Product />
          </Route>
          <Route path="/buy">
            <Buy />
          </Route>
          <Route path="/buy/:id">
            <Buy />
            </Route>
            <Route path="/buydetail">
            <Buydetail />
          </Route>
          <Route path="/sale">
            <Sale />
          </Route>
          <Route path="/size">
            <Size />
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/cart">
            <Cart/>
          </Route>
          <Route path="/wishlist">
            <Wishlist/>
          </Route>

        </Switch>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
