import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import store from './store';
import Main from './components/Layout/Main';
import Home from './components/Home';
import Register from './components/Auth/Register';
import Profile from './components/Profile/Profile';
import Login from './components/Auth/Login';
import NotFound from './components/NotFound';
import { logoutUser, getCurrentUser } from './actions/authAction';
import setAuthHeader from './utils/setAuthHeader';
console.log(store);

if (localStorage.getItem('jwtToken')) {
  const nowTime = Date.now() / 1000;
  const decoded = jwt_decode(localStorage.getItem('jwtToken'));
  console.log(decoded);
  if (nowTime > decoded.exp) {
    store.dispatch(logoutUser());
  } else {
    setAuthHeader(localStorage.getItem('jwtToken'));
    store.dispatch(getCurrentUser());
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <BrowserRouter>
            <Main>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/profile/:userId" component={Profile} />
                <Route component={NotFound} />
              </Switch>
            </Main>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
