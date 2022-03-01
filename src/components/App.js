import React from "react";
import Signup from "./Auth/Signup";
import { AuthProvider } from "../context/AuthContext";
// import { CategoryProvider } from "../context/CategoryContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { DashboardTest } from "./DashboardTest";
import { Login } from "./Auth/Login"
import Profile from "./Profile"
import  ForgotPassword  from "./Auth/ForgotPassword"
import  PrivateRoute  from "./Auth/PrivateRoute";
import  UpdateProfile  from "./UpdateProfile"
import AddBook from "./Books/AddBook";
import Cart from "./Books/Cart";
import MyBooks from "./Books/MyBooks";
import Requests from "./Books/Requests";
import { Test } from "./Test"
import { CategoryProvider } from "../context/CategoryContext";
import RentedBooks from "./Books/RentedBooks";
import MyFines from "./Books/Fines";
import SingleBookPage from "./Books/SingleBookPage";
import Contact from "./Books/Contact";
import ContactAdmin from "./Books/ContactAdmin";
import SingleContact from "./Books/SingleContact";

const App = () => {
  return (
    // <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
      // <div className="w-100" style={{ maxWidth: "400px"}}>
      <div>
        <Router>
          <AuthProvider>
            <CategoryProvider>
              <Switch>
                <PrivateRoute exact path='/' component={Dashboard}/>
                <PrivateRoute path='/profile'component={Profile}/>
                <PrivateRoute path='/update-profile' component={UpdateProfile}/>
                <PrivateRoute path='/add-book' component={AddBook} />
                <PrivateRoute path='/cart' component={Cart} />
                <PrivateRoute path='/my-books' component={MyBooks} />
                <PrivateRoute path='/requests' component={Requests} />
                <PrivateRoute path='/rented-books' component={RentedBooks} />
                <PrivateRoute path='/my-fines' component={MyFines} />
                <PrivateRoute path='/contact' component={Contact} />
                <PrivateRoute path='/contact-admin' component={ContactAdmin} />
                <PrivateRoute path='/contacts/:id' component={SingleContact} />
                <PrivateRoute path='/books/:id' component={SingleBookPage} />
                <Route path='/signup' component={Signup}/>
                <Route path='/login' component={Login}/>
                <Route path='/forgot-password' component={ForgotPassword}/>
                <Route path='/main' component={DashboardTest}/>
                <Route path='/test' component={Test}/>
              </Switch>
              </CategoryProvider>
          </AuthProvider>
        </Router>
        {/* <Test /> */}
      </div>

  )
}

export default App;
