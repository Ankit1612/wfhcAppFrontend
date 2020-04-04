import React, { Component } from 'react';
import {
	FacebookShareButton,
	WhatsappShareButton,
	FacebookIcon,
	WhatsappIcon
} from 'react-share';

class ShareUrl extends Component {

	constructor(props){
		super(props);

		this.state = {
			copySuccess: false
		}
	}

  copyToClipboard = (e) => {
    this.textArea.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
    this.setState({ copySuccess: true });
  };

	render(){
		var shareUrl = `https://wfhchallenge.herokuapp.com/${this.props.location.state.uniqueCode}`;
	return(
		     <div>
		     <p>tadaaa...your challenge has been created,copy the link below and share it with your friends to see the funny responses from your friends....</p>
		             <form>
          <input type="text"
            ref={(textarea) => this.textArea = textarea}
            value={shareUrl}
          />
        </form>
        {
         document.queryCommandSupported('copy') &&
          <div>
          	         <br></br>
            <button type="button" className="btn btn-primary btn-sm" onClick={this.copyToClipboard}>&nbsp;&nbsp;&nbsp;&nbsp;Copy&nbsp;&nbsp;&nbsp;&nbsp;</button> 
            {
            	this.state.copySuccess ?
            	<div style={{"color": "green"}}>
             		 Copied!
            	</div> : null
         	} 
          </div>
        }
        <div>
        	         <br></br>
          <FacebookShareButton
            url={shareUrl}
            className="Demo__some-network__share-button"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          &nbsp;
          <WhatsappShareButton
            url={shareUrl}
            className="Demo__some-network__share-button"
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
       </div>
	)};
}

export default ShareUrl;