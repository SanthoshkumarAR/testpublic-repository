
/**
 * This is the entry point of the code.
 * @author : Anandi Yogeesan
 * File Name : main.js
 * Created Date : 13th June 2016
 */

 import 'babel-polyfill';
 import jquery from 'jquery';
 import React from 'react';
 import {render} from 'react-dom';
 import configureStore from './store/configureStore';
 import {Provider} from 'react-redux';
 import {Router, browserHistory} from 'react-router';
 import routes from './routes';
 import './css/reset.css';
 import './css/style.css';
 import './css/materialize.css';
 import $ from './util/jquery-1.8.3.min';
 import 'materialize';


 import {loadAlbums} from './actions/albumsActions';

 const store = configureStore();
 store.dispatch(loadAlbums());
 render (
 	<Provider store={store}>
 		<Router history={browserHistory} routes={routes} />
 	</Provider>,
 	document.getElementById('app')
 	);

sessionStorage.setItem("baseUrlImages",window.location.origin+'/images/');
