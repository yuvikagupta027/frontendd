import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import './App.css';
import Home from './Home';
import Login from './Login';
import Adminloginn from './Adminloginn';
import Dashboard from './Dashboard';
import Dishes from './Dishes';
import Adminflavours from './Adminflavours';
import Adminusers from './Adminusers';
import Menu from './Menu';
import Adminmenu from './Adminmenu';
import Contact from './Contact';
import Billingaddress from './Billingaddress';
import Thankyou from './Thankyou';
import Adminaddress from './Adminaddress';
import Loginphn from './Loginphn';
import Adminorders from './Adminorders';
import Orders from './Orders';
import OrderDetail from './OrderDetail';
import Adminorderdetails from './Adminorderdetails';


function App() {

  // console.log(window.screen.availWidth);

  if (window.screen.availWidth > 768) {
    console.log("yes");
  } else {
    console.log("noo");

  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/Login' element={window.screen.availWidth > 768 ? <Login /> : <Loginphn />}></Route>
          {/* <Route path='/Login' element={<Loginphn />}></Route> */}
          <Route path='/' element={<Home />}></Route>
          <Route path='/Menu' element={<Menu />}></Route>
          <Route path='/Adminloginn' element={<Adminloginn />}></Route>
          <Route path='/Adminmenu' element={<Adminmenu />}></Route>
          <Route path='/Dashboard' element={<Dashboard />}></Route>
          <Route path='/Dishes' element={<Dishes />}></Route>
          <Route path='/Adminflavours' element={<Adminflavours />}></Route>
          <Route path='/Adminaddress' element={<Adminaddress />}></Route>
          <Route path='/Adminusers' element={<Adminusers />}></Route>
          <Route path='/Adminorders' element={<Adminorders />}></Route>
          <Route path='/Adminorderdetails' element={<Adminorderdetails />}></Route>
          <Route path='/Orders' element={<Orders />}></Route>
          <Route path='/OrderDetail' element={<OrderDetail />}></Route>
          <Route path='/Contact' element={<Contact />}></Route>
          <Route path='/Billingaddress' element={<Billingaddress />}></Route>
          <Route path='/Thankyou' element={<Thankyou />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;