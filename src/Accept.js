import React, { Component } from 'react';

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
    return (
      <div class="positioning">
        <p ref={this.initRef}>
          <i>I have accepted <b>#workfromhaomechallenge20</b> given by {this.props.location.state.name}
				and challenge is - <b>"{this.props.location.state.challenge}"</b> </i> https://wfhchallenges.com
        </p>
        { <button type="button" className="btn btn-primary btn-sm" onClick={this.copyToClipboard}>&nbsp;&nbsp;&nbsp;Copy&nbsp;&nbsp;&nbsp;</button> }
        {    	copied ?
            	<div style={{"color": "green"}}>
             		 Copied!
            	</div> : null}
         <div style={extratext}>
         <br></br>
        	<p> Copy the text and update it on your whatapp and facebook status and let know everyone 
        		you have accepted {this.props.location.state.name} challenge.</p>
        </div>
      </div>
    );
  }
}

export default Accept;