
import React, { useState } from 'react';
import {connect} from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';


import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions';

import { SignInContainer, ButtonsContainer } from './sign-in.styles'

// class SignIn extends React.Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             email : '',
//             password : ''
//         };
//     }

//     handleSubmit = event => {
//         event.preventDefault();
//         const { emailSignInStart } = this.props;
//         const {email, password} = this.state;
//         emailSignInStart(email, password);
//         this.setState({ email : '', password : ''});
//     };

//     handleChange = (event) => {
//         const { name, value } = event.target;
        
//         this.setState({
//             [name] : value
//         });
//     };

//     render() {
//         const { googleSignInStart } = this.props;
//         return (
//             <SignInContainer>
//                 <h2>I already have an account</h2>
//                 <span>Sign in with your email and password</span>
        
//                 <form onSubmit={this.handleSubmit}>
//                     <FormInput
//                         name='email'
//                         type='email'
//                         handleChange={this.handleChange}
//                         value={this.state.email}
//                         label='email'
//                         required
//                     />
//                     <FormInput
//                         name='password'
//                         type='password'
//                         value={this.state.password}
//                         handleChange={this.handleChange}
//                         label='password'
//                         required
//                     />
//                     <ButtonsContainer>
//                         <CustomButton type='submit'> Sign in </CustomButton>
//                         <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn> Sign in with Google </CustomButton>    
//                     </ButtonsContainer>
//                 </form>
//           </SignInContainer>
//         )
//     };
// };
const SignIn = ({googleSignInStart, emailSignInStart}) => {
    const initialValues = {
        email : '',
        password : ''
    };

    const [values, setValues] = useState(initialValues);

    const handleSubmit = event => {
        event.preventDefault();
        const {email, password} = values;
        emailSignInStart(email, password);
    }

    const handleChange = event => {
        const {name, value} = event.target;

        setValues({...values, [name] : value});
    }

    return (
        <SignInContainer>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    name='email'
                    type='email'
                    value={values.email}
                    handleChange={handleChange}
                    label='email'
                    required
                />
                <FormInput
                    name='password'
                    type='password'
                    value={values.password}
                    handleChange={handleChange}
                    label='password'
                    required
                />
                <ButtonsContainer>
                    <CustomButton type='submit'> Sign in </CustomButton>
                    <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn> Sign in with Google </CustomButton>    
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};

const mapDispatchToProps = dispatch => ({
    googleSignInStart : () => dispatch(googleSignInStart()),
    emailSignInStart : (email, password) => dispatch(emailSignInStart({email, password})) 
});

export default connect(null,mapDispatchToProps)(SignIn);

