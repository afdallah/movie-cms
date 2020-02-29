import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import jwtDecode from 'jwt-decode'
import './assets/scss/style.scss';
import App from './App';
import MainLayout from './components/MainLayout'
import Login from './pages/Login'
import About from './pages/About'
import Movies from './pages/Movies'
import * as serviceWorker from './serviceWorker';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('access_token')
  const isAuthenticated = token
  const user = token && jwtDecode(localStorage.getItem('access_token'))

  if (user && user.role !== 'super') return alert('You are not authorized')
  return (
    <Route {...rest} render={(props) => (
      isAuthenticated
        ? <Component {...props} />
        : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
    )} />
  )
}

ReactDOM.render(
  <Router>
    <MainLayout isAuthenticated>
      <Switch>
        <PrivateRoute exact path="/" component={App} />
        <PrivateRoute path="/movies" component={Movies} />
        <PrivateRoute path="/about" component={About} />
        <Route path="/login" render={props => <Login {...props} />} />
      </Switch>
    </MainLayout>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
