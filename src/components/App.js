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
import { Test } from "./Test"

const App = () => {
  return (
    // <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
      // <div className="w-100" style={{ maxWidth: "400px"}}>
      <div>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path='/' component={Dashboard}/>
              <PrivateRoute path='/profile'component={Profile}/>
              <PrivateRoute path='/update-profile' component={UpdateProfile}/>
              <PrivateRoute path='/add-book' component={AddBook} />
              <Route path='/signup' component={Signup}/>
              <Route path='/login' component={Login}/>
              <Route path='/forgot-password' component={ForgotPassword}/>
              <Route path='/main' component={DashboardTest}/>
              <Route path='/test' component={Test}/>
            </Switch>
          </AuthProvider>
        </Router>
      </div>

  )
}

export default App;
