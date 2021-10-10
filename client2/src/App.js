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
import ViewProduct from "./components/ViewProduct";
import InsertBuy from "./components/InsertBuy";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/customer">
            <Customer />
          </Route>
          <Route exact path="/customer/:id">
            <Customer />
          </Route>
          <Route exact path="/product">
            <Product />
          </Route>
          <Route exact path="/viewproduct">
            <ViewProduct/>
          </Route>
          <Route exact path="/viewproduct/:id">
            <ViewProduct />
          </Route>
          <Route exact path="/buy">
            <Buy />
          </Route>
          <Route exact path="/insertbuy">
            <InsertBuy/>
          </Route>
          <Route exact path="/buy/:id">
            <Buy />
          </Route>
          <Route exact path="/buydetail">
            <Buydetail />
          </Route>
          {/* <Route exact path="/buydetail/:id">
            <Buydetail/>
          </Route> */}
          <Route exact path="/sale">
            <Sale />
          </Route>
          <Route exact path="/size">
            <Size />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/wishlist">
            <Wishlist />
          </Route>
        </Switch>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
