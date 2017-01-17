import expect from 'expect';
import addAlbumReducer from './addAlbumReducer';
import * as albumsActions from '../actions/albumsActions';
import initialState from './initialState';
 import $ from 'jquery';
describe('addAlbum Reducer ', () => {
	it('it should add the album details', () => {
	const albumLists = [];
	const albumsAction = albumsActions.addAlbumSuccess(albumLists);
   	const newStateValue = addAlbumReducer(initialState, albumsAction);
    expect(newStateValue).toEqual({albumLists});
    	
  	});
});
