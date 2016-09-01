import React from 'react';
import {Route, IndexRoute, Redirect, IndexRedirect} from 'react-router';
import App from './components/App';
import Web from './components/Web';
import Home from './components/Home';
import Admin from './components/Admin';
import AdminHome from './components/AdminHome';
import Dahboard from './components/Dahboard';
import NewsInfo from './components/NewsInfo';
import Login from './components/Login';
import AdminNews from './components/AdminNews';
import AddNews from './components/AddNews';
import UpdateNews from './components/UpdateNews';

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/web" />
    <Route path="/web" component={Web}>
    	<IndexRoute component={Home}/>
    	<Redirect from="/web/board" to="/web/board/news"/>
	    <Redirect from="/web/board(/:type)" to="/web/board/:type/default"/>
	    <Route path="/web/board/:type/:part" component={Dahboard}>
	    	<Route path=":id" component={Dahboard}></Route>
	    </Route>
    </Route>
    <Route path="/admin" component={Admin}>
      <IndexRoute component={AdminHome}/>
      <Redirect from="/admin/update" to="/admin/news"/>
      <Route path="/admin/news" component={AdminNews}></Route>
      <Route path="/admin/add" component={AddNews}></Route>
      <Route path="/admin/update/:id" component={UpdateNews}></Route>
    </Route>
    <Route path="/login" component={Login}></Route>
  </Route>
);