
/**
 * Header of the app and common loader for the app is defined here.
 * @author : cognizant
 * File Name : Header.js
 * Created Date : 27/9
 */

 import React, {PropTypes} from 'react';

 class Header extends React.Component{

	render() {
		return (
			<div>
	    		<header>
					<div className="logoHdr">
						<img src={sessionStorage.baseUrlImages+"logo.png"}/>
						<div className="loaderBackGround innerLoader" style={{display:"none"}} >
						</div>
						<div className="opaCls innerLoader" style={{display:"none"}}>
							<img src={sessionStorage.baseUrlImages+"squares3.gif"} alt="squares3" />
						</div>
					</div>
				</header>
	    		
			</div>
 		);
	}
 }

 Header.propTypes = {

 };

 export default Header;
