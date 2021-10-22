import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Header2 from "./components/Header2";
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
import OrderHistory from "./components/OrderHistory";
import Saledetail from "./components/Saledetail";
import Warehouse from "./components/Warehouse";
import History from "./components/History";
import InsertProduct from "./components/InsertProduct";
import Revenue from "./components/Revenue";
import About from "./components/About";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header3 from "./components/Header3/Header3";
// import MobileNav from "./components/MobileNav/MobileNav";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <>
            <Header2 />
            <Header3/>
            {/* <MobileNav/> */}
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
            <Route path="/orderHistory">
              <OrderHistory/>
            </Route>
            <Route path="/warehouse">
              <Warehouse/>
            </Route>
            <Route path="/insertProduct">
              <InsertProduct/>
            </Route>
            <Route path="/history">
              <History/>
            </Route>
            <Route path="/revenue">
              <Revenue/>
            </Route>
            <Route path="/about">
              <About/>
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
