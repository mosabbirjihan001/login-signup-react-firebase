import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase.init';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SignUp = () => {

    const [success , setSuccess] = useState(false)
    const [errorMessage , setErrorMessage] = useState('')
    const [showPassword , setShowPassword] = useState(false)


    const handleSubmitSignUp = (event) => {

        event.preventDefault()
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        const photo = event.target.photo.value;
        const terms = event.target.terms.checked;

        console.log(email , password , terms , name , photo);

        // reset error message
        setErrorMessage('')
        setSuccess(false)

        if(!terms){
            setErrorMessage('Please accept our terms and condition.')
            return ;
        }
        if(password.length < 6){
            setErrorMessage('Password must be 6 Characters or longer.')
            return ;
        }

        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if(!regex.test(password)){
            setErrorMessage('at least one uppercase lowercase , number , special characters , length must be 6 characters')
        }

        // create user
        createUserWithEmailAndPassword(auth , email , password)
        .then(result => {
            console.log(result.user);
            setSuccess(true)


            // sent verification email ..
            sendEmailVerification(auth.currentUser)
            .then(() => {
              console.log('verification email sent.');
            })

            // update profile information
            const profile = {
              displayName : name ,
              photoURL : photo
            }
            updateProfile(auth.currentUser , profile)
            .then(() => {
              console.log('user profile updated');
            })
            .catch(error => {
              console.log('user profile update error.');
            })


        })
        .catch(error => {
            console.log('ERROR' , error.message);
            setErrorMessage(error.message)
            setSuccess(false)
        })
    }

    return (
        <div className=" max-w-lg mx-auto ">
            <h2 className="text-4xl my-8">Sign Up Here</h2>
            <form onSubmit={handleSubmitSignUp} className="card-body ">
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name='name' placeholder="name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input type="text" name='photo' placeholder="photo url" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label ">
            <span className="label-text ">Password</span>
          </label>
          <input type={showPassword ? 'text' : "password"}
           name='password' 
           placeholder="password" 
           className="input input-bordered"
            required />
        </div>
        <button onClick={() => setShowPassword(!showPassword)}
         className="btn btn-sm absolute right-2 top-12">
            {
                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
            }
            </button>
            <div className="form-control">
            <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
           <label className="label justify-start cursor-pointer">
           <input type="checkbox" name='terms' className="checkbox" />
             <span className="label-text ml-3">Accept our terms and condition.</span>
           </label>
         </div>
        <div className="form-control mt-6 items-center">
          <button className="btn btn-wide btn-warning">Login</button>
        </div>
      </form>
      {
        errorMessage && <p className='text-red-500'>{errorMessage}</p>
      }
      {
        success && <p className='text-green-500'>Sign up successful</p>
      }

      <p>Already have an account ? Please <Link to='/login'>Log in</Link> </p>
        </div>
    );
};

export default SignUp;