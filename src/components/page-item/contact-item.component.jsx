import React from 'react';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './contact-item.styles.scss';

class Contact extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         name : '',
         email : '',
         subject : '',
         message : ''
      };
   }

   handleChange = event => {
      const { name, value } = event.target;
      this.setState({
         [name] : value
      });
   };

   handleSubmit = event => {
      event.preventDefault();
      this.setState({name:'',email:'',subject:'',message:''});
   };

   render() {
      return (
         <div className='contact-form'>
            <h1>Contact Us</h1>
            <p>Get in touch and let us know how we can help.</p>
            <form onSubmit={this.handleSubmit} >
               <FormInput 
                  name='name'
                  type='text'
                  handleChange={this.handleChange}
                  value={this.state.name}
                  label='Name'
                  required
               />
               <FormInput 
                  name='email'
                  type='email'
                  handleChange={this.handleChange}
                  value={this.state.email}
                  label='Email'
                  required
               />
               <FormInput 
                  name='subject'
                  type='text'
                  handleChange={this.handleChange}
                  value={this.state.subject}
                  label='Subject'
                  required
               />
               <div className='message'>
                  <label for="message">Message</label>
                  <textarea name='message' value={this.state.message} rows='5' />
               </div>
               <div className='button-submit'>
                  <CustomButton type='submit'>Send Email</CustomButton>
               </div>
            </form>
         </div>
      );
   };
}

export default Contact;