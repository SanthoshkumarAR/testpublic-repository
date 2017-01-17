
/**
 * This file hold the component to load the markup of container of the app.
 * @author : cognizant
 * File Name : sampleAppPresent.js
 * Created Date : 27/9
 */
import React,{PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import $ from 'jquery';
import {connect} from 'react-redux';
import * as albumActions from '../actions/albumsActions';
import AlbumListInfo from './albumListsInfo';

class sampleAppPresent extends React.Component {
	constructor(props,context) {
		super(props,context);
		this.addAlbum = this.addAlbum.bind(this);
	}

	addAlbum (e) {
		e.preventDefault();
		let title = $('#title').val();
		let artist = $('#artist').val();
		let releaseYear = $('#releaseYear').val();
		console.log(title);
		this.props.actions.saveAlbum(title,artist,releaseYear);
		$('#title').val('');
		$('#artist').val('');
		$('#releaseYear').val('');
	}
	render(){
		let reqData = this.props;
		let albums = reqData.albumLists;
	
		return(
			<div className="contentDiv">
				<div className="headerDiv">
					<h2 className="headerdivh2 clearfix fleft">Java- Album Management
					</h2>	
				</div>
				<div className="AlbumList">
				<form className="row AlbumRow">
						<input type="hidden"/>
						<div className="input-field col s3 inputclassName Titlecls">
							<input id="title" type="text" className="validate"/>
							<label className="labelclassName" for="title">Title</label>
						</div>
						<div className="input-field col s3 inputclassName Artistcls">
							<input id="artist" type="text" className="validate"/>
							<label className="labelclassName" for="artist">Artist</label>
						</div>
						<div className="input-field col s3 inputclassName Releasecls">
							<input id="releaseYear" type="text" className="validate"/>
							<label className="labelclassName" for="releaseYear">Release Year</label>
						</div>
						<button type="submit" id="add" className="addList" value="" onClick={this.addAlbum}/>
					</form>
				</div>
				<div className="AlbumTbl">
					<header>
						<h5>List Of Albums</h5>
					</header>
					<div className="rowhead">
						<span>Title</span>
						<span>Artist</span>
						<span>Release Year</span>
					</div>
					{albums.map(album => 
						<AlbumListInfo key={album.id} album={album}/>	
					)}
				</div>
			</div>
		);
	}

}
function mapStateToProps (state,ownProps) {
 	return{}
}

function mapDispatchToProps(dispatch) {
	return{actions: bindActionCreators(Object.assign({},albumActions),dispatch)}
}
sampleAppPresent.propTypes={
	actions: PropTypes.object.isRequired,
}
export default connect(mapStateToProps,mapDispatchToProps)(sampleAppPresent);