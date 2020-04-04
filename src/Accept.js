import React, { Component } from 'react';

import {
	FacebookShareButton,
	WhatsappShareButton,
	FacebookIcon,
	WhatsappIcon
} from 'react-share';

const extratext= {
  color: '#808080',
  fontSize:15
};

class Accept extends Component {

constructor(props) {
    super(props);
    this.textContent = null;
    this.state = {
      copied: false
    };
  }

  copyToClipboard = async e => {
    window.getSelection().removeAllRanges();
    var range = document.createRange();
    range.selectNode(this.textContent);
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    this.setState({ copied: true });
  };

  initRef = c => (this.textContent = c);

  render() {
    const { copied } = this.state;
    var message = `I have accepted #workfromhaomechallenge by ${this.props.location.state.name}
				to ${this.props.location.state.challenge} https://wfhchallenge.herokuapp.com`;
    return (
      <div class="positioning" style={{paddingLeft:10, paddingRight:10}}>
      <div><h4>Copy & Share</h4><br></br></div>
        <p ref={this.initRef}>
          <i>I have accepted <b>#workfromhaomechallenge</b> by <b>{this.props.location.state.name}</b> to <b>"{this.props.location.state.challenge}"</b> </i> https://wfhchallenge.herokuapp.com
        </p>
        { <button type="button" className="btn btn-primary btn-sm" onClick={this.copyToClipboard}>&nbsp;&nbsp;&nbsp;Copy&nbsp;&nbsp;&nbsp;</button> }
        {    	copied ?
            	<div style={{"color": "green"}}>
             		 Copied!
            	</div> : null}
        <div>
        	         <br></br>
          <FacebookShareButton
          	url="https://wfhchallenge.herokuapp.com"
            quote={message}
            className="Demo__some-network__share-button"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          &nbsp;
          <WhatsappShareButton
          	url="https://wfhchallenge.herokuapp.com"
            title={message}
            className="Demo__some-network__share-button"
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <div>
          <br></br>
          	<a href="https://wfhchallenge.herokuapp.com">create a challenge</a>
          </div>
        </div>
         <div style={extratext}>
         <br></br>
        	<p>Copy/Share the challenge by clicking on copy/share button and let your friends know that you have accepted the challenge.You can then upload your task on whatsapp/facebook to complete it....!!!!!!</p>
        </div>
      </div>
    );
  }
}

export default Accept;