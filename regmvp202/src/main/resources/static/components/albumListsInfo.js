
/**
 * This file holds the component to load the list of albums available. And the event related to delete and update album details
 * @author : cognizant
 * File Name : albumListInfo.js
 * Created Date : 27/9
 */
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import $ from 'jquery';
import {connect} from 'react-redux';
import * as albumActions from '../actions/albumsActions';


class AlbumListInfo extends React.Component {

	constructor(props,context) {
		super(props,context);
		this.editAlbum = this.editAlbum.bind(this);
		this.deleteAlbum = this.deleteAlbum.bind(this);
		this.updateAlbum = this.updateAlbum.bind(this);
	}

	editAlbum(e) {
		e.preventDefault();
		let eltId= e.target.id;
		$("#editRow_"+eltId).addClass('hiddenTbl');
		$("#editDiv_"+eltId).removeClass('hiddenTbl');
	}

	updateAlbum(e){
		e.preventDefault();
		let eltId= e.target.id;
		let title = $('#editDiv_' +eltId+' #edit_title').val();
		let artist = $('#editDiv_' +eltId+' #edit_artist').val();
		let releaseYear = $('#editDiv_' +eltId+' #edit_releaseYear').val();
		this.props.actions.updateAlbum(title,artist,releaseYear,eltId);
		$("#editRow_"+eltId).removeClass('hiddenTbl');
		$("#editDiv_"+eltId).addClass('hiddenTbl');
	}

	deleteAlbum(e){
		e.preventDefault();
		let eltId= e.target.id;
		this.props.actions.deleteAlbum(eltId);
	}

	render(){
		let deleteImgSrc = sessionStorage.baseUrlImages+"Delete.png";
		let editImgSrc = sessionStorage.baseUrlImages+"Edit.png";
		let saveImgSrc = sessionStorage.baseUrlImages+"Save.png";
		let album = this.props.album;
		let divId='editRow_'+album.id;
		let editDiv = 'editDiv_'+album.id;

		return(
			<div className="clearfix albumTblList">
				<div className="editRow" id={divId}>
					<label id="titlelbl" className="fleft AlbumLbl" >{album.title}</label>
					<label id="artistlbl"  className="fleft AlbumLbl">{album.artist}</label>
					<label  className="fleft AlbumLbl">{album.releaseYear}</label>
					<label id={album.id}/>
					<div className="fright albumTblBtn" id="albumdiv{{u.id}}">
						<a href="#" id={album.id} className="fleft tdIcons" >
							<img id={album.id} src={editImgSrc}/>
						</a>
						<a href="#" id={album.id} className="fleft tdIcons" onClick={this.editAlbum}>
							<h5 id={album.id} className=""><span id={album.id} className="borderleft">Edit</span></h5>
						</a>
						<a href="#" className="fleft tdIcons" onClick={this.deleteAlbum}>
							<img id={album.id} src={deleteImgSrc}/>
						</a>
						<a href="#" className="fleft tdIcons" onClick={this.deleteAlbum}>
							<h5 id={album.id} onClick={this.deleteAlbum}>Delete</h5>
						</a>
					</div>
				</div>
				<div id={editDiv} className="row clearfix albumTblList hiddenTbl">
					<div className="input-field col s3 inputclassName Titlecls">
						<input id="edit_title" type="text" className="validate" defaultValue={album.title}/>
					</div>
					<div className="input-field col s3 inputclassName Artistcls">
						<input id="edit_artist" type="text" className="validate" defaultValue={album.artist}/>
					</div>
					<div className="input-field col s2 inputclassName Releasecls">
						<input id="edit_releaseYear" type="text" className="validate" defaultValue={album.releaseYear}/>
					</div>
					<label id={album.id}/>
					<div className="fright albumTblBtn" id="albumdiv{{u.id}}">
						<a href="#" id={album.id} className="fleft tdIcons" onClick={this.updateAlbum}>
							<img id={album.id} src={saveImgSrc} onClick={this.updateAlbum}/>
						</a>
						<a href="#" id={album.id} className="fleft tdIcons" onClick={this.updateAlbum}>
							<h5 id="edittxt{{u.id}}" className=""  id={album.id}><span  id={album.id} className="borderleft">Save</span></h5>
						</a>
						<a href="#"  id={album.id}className="fleft tdIcons" onClick={this.deleteAlbum}>
							<img id={album.id} src={deleteImgSrc} onClick={this.deleteAlbum}/>
						</a>
						<a href="#" id={album.id} className="fleft tdIcons">
							<h5 id={album.id} onClick={this.deleteAlbum}>Delete</h5>
						</a>
					</div>	
				</div>	
			</div>
		)
	}
}
function mapStateToProps (state,ownProps) {
 	return{albumLists : state.albumLists[0]}
}

function mapDispatchToProps(dispatch) {
	return{actions: bindActionCreators(Object.assign({},albumActions),dispatch)}
}
AlbumListInfo.propTypes={
	actions: PropTypes.object.isRequired,
}
export default connect(mapStateToProps,mapDispatchToProps)(AlbumListInfo);
