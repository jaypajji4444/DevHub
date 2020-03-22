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
import Profiles from '../profile/Profiles';
import Profile from '../profiles/Profile';
import Posts from '../Posts/Posts';
import Post from '../post/Post';

const Routes = () => {
  return (
    <section className='container'>
    <Alert />
    <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path="/dashboard" component={Dasboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
        <Route component={NotFound} />

    </Switch>
    </section>
  );
};

export default Routes;