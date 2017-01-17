import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function addAlbumReducer (state=initialState.albumLists,action){
	switch(action.type) {
		case types.ADD_ALBUMS :
			return [
				...state,
				Object.assign({},action.albumLists)
			];
		default :
			return state;
	}
}