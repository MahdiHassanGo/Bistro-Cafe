import { useEffect, useRef } from "react";
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha  } from 'react-simple-captcha';


const Login = () => {
    const handleLogin = event =>{
       event.preventDefault(); 
       
       const form = event.target;
       const email =form.email.value;
       const password =form.password.value;
       console.log(email,password)

    }
const captchaRef= useRef(null);

    useEffect(()=>{
        loadCaptchaEnginge(6); 
    },[])

const hanldeValidateCaptcha =()=>{
const value = captchaRef.current.value;
console.log(value)
}


    return (
     
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onClick={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control">
              <LoadCanvasTemplate></LoadCanvasTemplate>
                <input type="text" placeholder="type the captcha here" 
                name='captcha' ref={captchaRef} className="input input-bordered" required />
                <button onClick={hanldeValidateCaptcha} className="btn btn-outline btn-xs mt-6" >
                validate
                </button>
             
              </div>
              <div className="form-control mt-6">
               
                <input className="btn btn-primary" type="submit" value={'Login'} />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Login;