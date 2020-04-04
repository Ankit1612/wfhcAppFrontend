import React, {Component} from 'react';

class Header extends Component{
	render(){
	return(
		<div>
			<nav className="navbar navbar-expand-sm justify-content-center fixed-top">
  				<a className="navbar-brand" href="#">
  					<img src="../logo513.png" height="50"/>
  				</a>
			</nav>
		</div>
	);
}
}

export default Header;