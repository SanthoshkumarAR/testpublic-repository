import $ from 'jquery';
const addAlbums = (title,artist,releaseYear) => {

let myinit = {
method:'POST'
}
	return $.post('/addAlbum?title='+title+'&artist='+artist+'&releaseYear='+releaseYear);
}
export default addAlbums;
