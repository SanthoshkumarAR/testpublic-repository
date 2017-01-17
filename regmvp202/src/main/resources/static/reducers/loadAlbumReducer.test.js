import expect from 'expect';
import loadAlbumReducer from './loadAlbumReducer';
import * as albumsActions from '../actions/albumsActions';
import initialState from './initialState';
 import $ from 'jquery';
describe('load Album Reducer ', () => {
	it('it should add the album details', () => {
		const albumLists = [];
		albumLists.title="sample1";
		albumLists.artist= "artist1",
		albumLists.releaseYear= "2016",
		albumLists.id= "1"
	const albumsAction = albumsActions.loadAlbumsSuccess(albumLists);
   	const newStateValue = loadAlbumReducer(initialState, albumsAction);
    expect(newStateValue).toEqual([albumLists]);
    	
  	});
});
