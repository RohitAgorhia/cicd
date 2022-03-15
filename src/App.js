import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Policy from "./components/Policy";
import PrivateRoute from "./components/PrivateRoute";
import Activate from "./components/Activate";
import Reset from "./components/Reset";
import ForgotPassword from "./components/Forgotpassword";
import ChangePassword from "./components/ChangePassword";
import Share from "./components/Share";


const App = () => { 

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />              
                <Route path="/register" exact component={Register} />
                <Route path="/forgot_password" exact component={ForgotPassword} />
                <Route path="/policy" exact component={Policy} />
                <Route path="/activate/:id" exact component={Activate} />
                <Route path="/password_reset/:id" exact component={Reset} />
                <Route path="/share/:code" exact component={Share} />

                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/change_password" component={ChangePassword} />
            </Switch>
        </BrowserRouter>
    );
};
export default App;