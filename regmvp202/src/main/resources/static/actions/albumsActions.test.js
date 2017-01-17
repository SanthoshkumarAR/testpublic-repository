import expect from 'expect';
import * as albumsActions from './albumsActions';
import * as types from './actionTypes';
import initialState from '../reducers/initialState';
import $ from 'jquery';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

describe('Album Action', () => {
  	describe('loadAlbumsSuccess', () => {
    	it('should load the list of albums available', () => {
			const albumLists = [
				{
					"title" : "sample1",
					"artist" : "artist1",
					"releaseYear" : "2016",
					"id" :"1"
				},
				{
					"title" : "sample2",
					"artist" : "artist2",
					"releaseYear" : "2015",
					"id":"2"
				}
			];
	      	const expectedAction = {
	       		type: types.LOAD_ALBUMS,
	       		albumLists: albumLists	
	      	};

		    const actutalAction = albumsActions.loadAlbumsSuccess(albumLists);
		    expect(actutalAction).toEqual(expectedAction);
		    expect(actutalAction.type).toEqual(expectedAction.type);
		    expect(actutalAction.albumLists).toEqual(expectedAction.albumLists);
    	});
  	});
  	describe('addAlbum Success', () => {
    	it('should add the alblum to the available list', () => {
			const albumLists = [
				{
					"title" : "sample1",
					"artist" : "artist1",
					"releaseYear" : "2016",
					"id" :"1"
				}
			];
	      	const expectedAction = {
	       		type: types.SAVE_ALBUMS,
	       		album: albumLists	
	      	};

		    const actutalAction = albumsActions.addAlbumSuccess(albumLists);
		    expect(actutalAction).toEqual(expectedAction);
		    expect(actutalAction.type).toEqual(expectedAction.type);
		    expect(actutalAction.album).toEqual(expectedAction.album);
    	});
  	});
	
	const middleware = [thunk];
	const mockStore = configureMockStore(middleware);

	describe('load the album list Api', () => {
	  	afterEach(() => {
		    nock.cleanAll();
		});

			const albumLists = [
				{
					"title" : "sample1",
					"artist" : "artist1",
					"releaseYear" : "2016",
					"id" :"1"
				},
				{
					"title" : "sample2",
					"artist" : "artist2",
					"releaseYear" : "2015",
					"id":"2"
				}
			];

	 	it('should call the album list Api and update the store value ', (done) => {
		    
		    let expectedAction = {
	       		type: types.LOAD_ALBUMS,
	       		albumLists: albumLists	
	      	};
		    
		    const store = mockStore(initialState, expectedAction);
		    expectedAction = store.dispatch(expectedAction);
		    const actutalAction = albumsActions.loadAlbumsSuccess(albumLists);
		   	expect(expectedAction).toEqual(actutalAction);
		   	expect(expectedAction.type).toEqual(actutalAction.type);
		    expect(expectedAction.albumLists).toEqual(actutalAction.albumLists);
		    done();
	  	});
	});
	describe('add  album list Api', () => {
	  	afterEach(() => {
		    nock.cleanAll();
		});

			const albumLists = [
				{
					"title" : "sample1",
					"artist" : "artist1",
					"releaseYear" : "2016",
					"id" :"1"
				}
			];

	 	it('should call the add album  Api and update the store value ', (done) => {
		    
		    let expectedAction = {
	       		type: types.SAVE_ALBUMS,
	       		album: albumLists	
	      	};
		    
		    const store = mockStore(initialState, expectedAction);
		    expectedAction = store.dispatch(expectedAction);
		    const actutalAction = albumsActions.addAlbumSuccess(albumLists);
		   	expect(expectedAction).toEqual(actutalAction);
		   	expect(expectedAction.type).toEqual(actutalAction.type);
		    expect(expectedAction.album).toEqual(actutalAction.album);
		    done();
	  	});
	});
});


