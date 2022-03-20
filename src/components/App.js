import React from "react";
import Signup from "./Auth/Signup";
import { AuthProvider } from "../context/AuthContext";
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
import { CategoryProvider } from "../context/CategoryContext";
import RentedBooks from "./Books/RentedBooks";
import Returns from "./Books/Returns";
import SingleBookPage from "./Books/SingleBookPage";
import Contact from "./Books/Contact";
import ContactAdmin from "./Books/ContactAdmin";
import SingleContact from "./Books/SingleContact";
import Deleted from "./Books/Deleted";

const App = () => {
  return (
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
                <PrivateRoute path='/returns' component={Returns} />
                <PrivateRoute path='/contact' component={Contact} />
                <PrivateRoute path='/contact-admin' component={ContactAdmin} />
                <PrivateRoute path='/contacts/:id' component={SingleContact} />
                <Route path='/books/:id' component={SingleBookPage} />
                <PrivateRoute path='/deleted' component={Deleted} />
                <Route path='/signup' component={Signup}/>
                <Route path='/login' component={Login}/>
                <Route path='/forgot-password' component={ForgotPassword}/>
                <Route path='/main' component={DashboardTest}/>
              </Switch>
              </CategoryProvider>
          </AuthProvider>
        </Router>
      </div>

  )
}

export default App;
