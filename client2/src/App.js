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
import InsertCustomer from "./components/InsertCustomer";
import Register from "./components/Register";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import Buydetail from "./components/Buydetail";
import ViewProduct from "./components/ViewProduct";
import InsertBuy from "./components/InsertBuy";
import InsertBuyDetail from "./components/InsertBuyDetail";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Saledetail from "./components/Saledetail";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <>
            <Header />
            {/* <div className=""> */}
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/customer">
              <Customer />
            </Route>
            <Route path="/customer/:id">
              <Customer />
            </Route>
            <Route path="/insertCustomer">
              <InsertCustomer />
            </Route>
            <Route path="/product">
              <Product />
            </Route>
            {/* <Route  path="/viewproduct">
            <ViewProduct/>
          </Route> */}
            <Route path="/viewproduct/:prod_color_id">
              <ViewProduct />
            </Route>
            <Route path="/buy">
              <Buy />
            </Route>
            <Route path="/insertbuy">
              <InsertBuy />
            </Route>
            <Route path="/buy/:id">
              <Buy />
            </Route>
            <Route path="/insertbuydetail">
              <InsertBuyDetail />
            </Route>
            <Route path="/buydetail">
              <Buydetail />
            </Route>
            {/* <Route  path="/buydetail/:id">
            <Buydetail/>
          </Route> */}
            <Route path="/sale">
              <Sale />
            </Route>
            <Route path="/saledetail">
              <Saledetail />
            </Route>
            <Route path="/size">
              <Size />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <LogIn />
            </Route>
            <Route path="/Signup">
              <SignUp />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/wishlist">
              <Wishlist />
            </Route>
            {/* </div> */}
            <Footer />
          </>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
