import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loadAlbumReducer (state=initialState.albumLists,action){
	switch(action.type) {
		case types.LOAD_ALBUMS :
			return [
				action.albumLists
			];
		default :
			return state;
	}
}