/**
	* This fill will holds the action components for add, delete and update alibum details.
	* @author: cognizant
	* Date of creation:  28/9 
	* File name: albumsActions.js
*/
import * as types from './actionTypes';
import getAllAlbumsApi from '../entities/getAllAlbumsApi';
import addAlbumApi from '../entities/addAlbumApi';
import deleteAlbumApi from '../entities/deleteALbumApi';
import updateAlbumApi from '../entities/updateAlbumApi';
import $ from 'jquery';

export function addAlbumSuccess (album) {
	return {type:types.SAVE_ALBUMS, album}
}

export function loadAlbumsSuccess(albumLists){	
	$('.innerLoader').css('display','none');
	return {type:types.LOAD_ALBUMS,albumLists}
}

export function loadAlbums(){
	$('.innerLoader').css('display','block');
	return function(dispatch) {
		return getAllAlbumsApi().then(function(response) {
			dispatch(loadAlbumsSuccess(response));
		})
	};
}
export function saveAlbum(title,artist,releaseYear) {
	$('.innerLoader').css('display','block');
	return function (dispatch) {
		return addAlbumApi(title,artist,releaseYear).then(function(response) {
			return getAllAlbumsApi().then(function(response) {
				dispatch(loadAlbumsSuccess(response));
			});
		})
	};
}

export function updateAlbum(title,artist,releaseYear,id) {
	$('.innerLoader').css('display','block');
	return function (dispatch) {
		return updateAlbumApi(title,artist,releaseYear,id).then(function(response) {
			return getAllAlbumsApi().then(function(response) {
				console.log("Inside UPDATE albums",response);
				dispatch(loadAlbumsSuccess(response));
			});
		})
	};
}

export function deleteAlbum (id) {
	$('.innerLoader').css('display','block');
	return function (dispatch) {
		return deleteAlbumApi(id).then(function(response) {
			return getAllAlbumsApi().then(function(response) {
				dispatch(loadAlbumsSuccess(response));
			});
		})
	};
}