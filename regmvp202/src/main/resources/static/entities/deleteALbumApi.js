
import $ from 'jquery';
const deleteAlbumApi = (id) => {

let myinit = {
method:'GET'
}
	return $.getJSON('/deletealbum?id='+id);
}
export default deleteAlbumApi;