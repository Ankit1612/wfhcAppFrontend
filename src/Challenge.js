import React, { Component} from 'react';
import { Redirect } from "react-router-dom";
import axios from "axios";
import styles from './Chalenge.module.css';

class Challenge extends Component {

	constructor(props) {
        super(props);
        this.state = {
            option: ' ',
            custom: ' ',
            errors: ' ',
            isRadioSelected: true
        };
    }

    handleChange = (e) => {
        this.setState({
        	option: e.target.value,
        	isRadioSelected: true
        });
        if(e.target.value === 'custom'){
        this.setState({
    		 isRadioSelected: false
    	});	
        }
    }

    handleChangeRadio = (e) => {
    	this.setState({
    		 isRadioSelected: false
    	});
    }

    customHandleChange = (e) => {
        this.setState({
            custom: e.target.value
        });
    }

    handleValidation(){
        let field = this.state.custom;
        let errors = '';
        let formIsValid = true;

        //Name
        if(field === ''){
           formIsValid = false;
           errors = "Please enter challenge!";
        }
       
       this.setState({errors: errors});
       return formIsValid;
   }

   handleSubmit = (e) => {
      	e.preventDefault();
    	var customQuestion;
    	if(this.state.option === 'custom'){
    		customQuestion = this.state.custom;
    	} else {
    		customQuestion = this.state.option;
    	}
    	var loginUrl = "https://wfhcfbackend.herokuapp.com/createChallenge";
    	var payload = {
      		name: this.props.location.state.uname,
      		challenge: customQuestion
    	};

    	axios({
      	method: "post",
      	url: loginUrl,
      	data: payload,
      	crossDomain: true,
      	headers: {
        "accept": "application/json",
        "content-type": "application/json" 
      	}
    	}).then(
      	function(response) {
        if (response.status === 200) {
          	this.props.history.push({
          		pathname: `/profile/${payload.name}`, 
          		state: { uniqueCode: response.data,
          				 username: payload.name}}
          		);
        } else if (response.status !== 400) {
          console.log("failed to login");
          return <Redirect to="/welcome" />;
        }
      }.bind(this)
    );
    }

	render() {
		return(
			<div>
			<form onSubmit={this.handleSubmit}>
			<div>
			<div className={styles.Options}>
			<p><i>Hello <b>{this.props.location.state.uname}</b>, as days are getting bore in lockdown, 
			lets have some fun.Give your friends a dare,and ask them to post it on any social media.Give them 
			a hilarious task and enjoy seeing them doing funny things.Let's have fun while we #StayHome #StaySafe...
			Lets not break the chain....</i></p>
			<p>You can eiher pick a dare from list below, or create you own dare to have real fun.....</p>
			 <div className="form-check">
  				<label className="form-check-label">
    			<input type="radio" className="form-check-input" value="Mimic any of your colleague/friend and post it on your whatsapp story."
              		checked={this.state.option === "Mimic any of your colleague/friend and post it on your whatsapp story."}
              		onChange={this.handleChange}/>Mimic any of your colleague/friend and post it on your whatsapp story.
    			</label>
			 </div>
			 <div className="form-check">
  				<label className="form-check-label">
    			<input type="radio" className="form-check-input" value="Update your story with a childhood pic."
              		checked={this.state.option === "Update your story with a childhood pic."}
              		onChange={this.handleChange}/>Update your story with a childhood pic.
  				</label>
			 </div>
			 <div className="form-check justify-content-left align-items-left">
  				<label className="form-check-label">
    			<input type="radio" className="form-check-input" value="Post a pic of yours in your saree."
              		checked={this.state.option === "Post a pic of yours in your saree."}
              		onChange={this.handleChange} />Post a pic of yours in your saree.
  				</label>
			 </div> 
			 <div className="form-check">
  				<label className="form-check-label">
    			<input type="radio" className="form-check-input" value="custom"
              		checked={this.state.option === "custom"}
              		onChange={this.handleChange} />Create your own challenge.
  				</label>
			 </div>
			 <div style={{paddingTop:10, paddingBottom:10}}>
			 <textarea className="form-control comment" rows="3" value={this.state.custom} 
  					onChange={this.customHandleChange} disabled={this.state.isRadioSelected}></textarea>
  			 <span style={{color: "red", fontSize:12}}>{this.state.errors}</span>
  			 </div>
			 </div>
			     <button type="submit" className="btn btn-success btn-sm">&nbsp;Create&nbsp;</button>
			</div>
			</form>
			</div>
		);
	}
}

export default Challenge;