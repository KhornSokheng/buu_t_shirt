import './App.css';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Header from './components/Header';
import InsertCustomer from './components/InsertCustomer';

function App() {
  return (
    <div className="App">
      <Header/>
      <Banner/>
      <InsertCustomer/>
      <Footer/>
    </div>
  );
}

export default App;
