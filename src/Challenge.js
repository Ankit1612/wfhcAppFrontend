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
			<form onSubmit={this.handleSubmit}>
			<div>
			<div className={styles.Options}>
			<p><i>Hello <b>{this.props.location.state.uname}</b>, pick a challenge from given option 
			or you can create your own challenge for your friends.</i></p>
			 <div className="form-check">
  				<label className="form-check-label">
    			<input type="radio" className="form-check-input" value="Update your status with the message ‘I’m stupid’."
              		checked={this.state.option === "Update your status with the message ‘I’m stupid’."}
              		onChange={this.handleChange}/>Update your status with the message ‘I’m stupid and all your olds pic and tell status about me also’.
    			</label>
			 </div>
			 <div className="form-check">
  				<label className="form-check-label">
    			<input type="radio" className="form-check-input" value="Cook egg maggie and update on your's status."
              		checked={this.state.option === "Cook egg maggie and update on your's status."}
              		onChange={this.handleChange}/>Cook egg maggie and update on your's status.
  				</label>
			 </div>
			 <div className="form-check justify-content-left align-items-left">
  				<label className="form-check-label">
    			<input type="radio" className="form-check-input" value="Update you'r status with your's childhood pics."
              		checked={this.state.option === "Update you'r status with your's childhood pics."}
              		onChange={this.handleChange} />Update you'r status with your's childhood pics.
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
		);
	}
}

export default Challenge;