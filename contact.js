// This would be the front end page

import React, { bind, } from 'react';
import Axios from 'axios';

import './Contact.css'

class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: '',
            disabled: false,
            emailSent: null,
        };

        this.handleChange = this.handleChange.bind(this);
     
    }

    handleChange(event,field) {
        this.setState({ [field]: event.target.value});
      }

      handleSubmit = (event) => {
          event.preventDefault();

          this.setState({
              disabled: true,       
          });

              Axios.post('http://localhost:3030/api/email', this.state)
              .then(res => {
                  if(res.data.success) {
                this.setState({
                    disabled: false,
                    emailSent:true
                });
            } else {
                    this.setState({
                        disabled: false,
                        emailSent:false
                    });
                }           
              })
              .catch(err => {
                  this.setState({
                      disabled:false,
                      emailSent: false
                  });
              })
          
      }

   render() {
    return(
        <div className="Contact-page">
       
          <motion.h1 {...exit} > Contact </motion.h1>

          <form className="form" onSubmit={this.handleSubmit}  >
          
          <div className="name-box" >
          <group >
             <label>
                <div className="name">Full Name </div>
                <input className="full-name" type="text" name="name" value={this.state.name} onChange={(event)=>this.handleChange(event,"name")} /> 
             </label> 
          </group>
          </div>
          
         
          <div className="email-box" > 
          <group >
             <label>
                <div className="name"> Email </div> 
                <input className="Email" type="email" name="email" value={this.state.email} onChange={(event)=>this.handleChange(event,"email")} /> 
             </label>
          </group>
          </div>
          

          <div className="message-box" >
          <group >
             <label >
             <div className="name">  Message </div>
                <textarea className="Message" type="message" name="message" value={this.state.message} onChange={(event)=>this.handleChange(event,"message")} /> 
             </label> 
          </group>
          </div>
        
            
                     <button className="send-btn" type="submit" disabled={this.state.disabled} > Send </button>

                     {this.state.emailSent === true && <p className="Success"> Email sent </p>}
                     {this.state.emailSent === false && <p className="Failure"> Error! Email has not been sent </p>}
            
          </form>
       
       </div>
    );
    }
}

export default Contact;