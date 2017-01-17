
/**
 * Main Reducer File where all the reducers are defined.
 * @author :
 * File Name : index.js
 * Path : src/reducers
 * Created Date : 13th June 2016
 *
 */

 import {combineReducers} from 'redux';
 import addAlbum from './addAlbumReducer';
 import albumLists from './loadAlbumReducer';
/**
 * Root Reducer is defined.
 */
 const rootReducer = combineReducers({
 	addAlbum,
 	albumLists
});

export default rootReducer;
