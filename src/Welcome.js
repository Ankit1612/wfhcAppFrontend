import React from 'react';

const hashtag = {
  color: '#1da1f2'
};

class Welcome extends React.Component {
	 constructor(props) {
        super(props);
        this.state = {
           fields: {},
           errors: {}
        };
    }

    handleChange = (field, e) => {
         let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if(!fields["name"]){
           formIsValid = false;
           errors["name"] = "Please enter name!";
        }

        if(typeof fields["name"] !== "undefined"){
           if(!fields["name"].match(/^[a-zA-Z]+$/)){
              formIsValid = false;
              errors["name"] = "Please enter valid name!";
           }        
        }
       

       this.setState({errors: errors});
       return formIsValid;
   }

   handleSubmit = (e) => {
      	e.preventDefault();

      	 if(this.handleValidation()){
    		this.props.history.push('/challenge', {uname: this.state.fields["name"]});
        }else{
        }
    }

    render(){
	return (
		<div>
			<h3 style={hashtag}>#workfromhomechallenge</h3>
			<form onSubmit={this.handleSubmit.bind(this)}>
  				<label>Enter your name:</label>
 		 		<input type="text" className="form-control" id="usr"
                        value={this.state.fields["name"]}
                        onChange={this.handleChange.bind(this, "name")}/>
                <span style={{color: "red", fontSize:12}}>{this.state.errors["name"]}</span>
                <br></br>
				<button type="submit" className="btn btn-primary btn-sm">&nbsp;&nbsp;&nbsp;Enter&nbsp;&nbsp;&nbsp;</button>
			<br></br>
			<br></br>
			<br></br>
			<div className="container">
			<p style={hashtag}>
				#workfromhome #challengeaccepted #workfromhomechallenge #timepass #lockdown #quarantine #covid19
				#gocorona #boreathome #challengeoftheday #daretodo #cooking #washing #laptop #instagram #netflix 
				#game #tiktok #memes #birthdaybash
			</p>
			</div>
			</form>
		</div>
		);
	}
};

export default Welcome;