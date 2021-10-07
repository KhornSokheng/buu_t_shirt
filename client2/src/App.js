import './App.css';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Buy from './components/Buy';
import Sale from './components/Sale';
import Size from './components/Size';
import Product from './components/Product';

import InsertCustomer from './components/InsertCustomer';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/customer">
            <InsertCustomer/>
          </Route>
          <Route path="/customer/:id">
            <InsertCustomer/>
          </Route>
          <Route path="/product">
            <Product/>
          </Route>
          <Route path="/Buy">
            <Buy/>
          </Route>
          <Route path="/Buy/:id">
            <Buy/>
          </Route>
          <Route path="/Sale">
            <Sale/>
          </Route>
          <Route path="/Size">
            <Size/>
          </Route>
        </Switch>


      </Router>
      <Footer/>
    </div>
  );
}

export default App;
