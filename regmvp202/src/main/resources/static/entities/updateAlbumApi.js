
import $ from 'jquery';
const updateAlbumApi = (title,artist,releaseYear,id) => {

let myinit = {
method:'POST'
}
	return $.post('/editAlbum?title='+title+'&artist='+artist+'&releaseYear='+releaseYear+'&id='+id);
}
export default updateAlbumApi;