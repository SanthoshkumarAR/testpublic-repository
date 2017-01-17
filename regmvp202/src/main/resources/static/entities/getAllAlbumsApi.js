

import $ from 'jquery';
const getAllAlbums = () => {

let myinit = {
method:'GET'
}
	return $.getJSON('/albums');
}
export default getAllAlbums;
