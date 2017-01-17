
/**
 * This file holds the overall container of the app.
 * @author : cognizant
 * File Name : app.js
 * Created Date : 27/9
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as albumActions from '../actions/albumsActions';
import Header from '../components/common/header';
import SampleAppPresent from '../components/sampleAppPresent';
class App extends React.Component{

constructor(props,context) {
	super(props,context);
}
	componentWillMount() { 
		this.props.actions.loadAlbums();
	}

	render() {
		return (
			<div className="ToDoApp">			
				<Header/>
				<SampleAppPresent albumLists={this.props.albumLists}/>
			</div>
			);
	}
}

function mapStateToProps (state,ownProps) {
 	return{albumLists : state.albumLists[0]}
}

function mapDispatchToProps(dispatch) {
	return{actions: bindActionCreators(Object.assign({},albumActions),dispatch)}
}

App.propTypes={
	actions: PropTypes.object.isRequired,
	albumLists: PropTypes.array.isRequired
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
