import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import NotFound from '../layout/NotFound';
import Dasboard from "../dashboard/Dashboard";
import PrivateRoute from "./PrivateRoutes"
import CreateProfile from '../profile-forms/CreateProfile';
import AddEducation from "../profile-forms/AddEducation";
import AddExperience from "../profile-forms/AddExperience"
import EditProfile from '../profile-forms/EditProfile';

const Routes = () => {
  return (
    <section className='container'>
    <Alert />
    <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dasboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <Route component={NotFound} />

    </Switch>
    </section>
  );
};

export default Routes;
