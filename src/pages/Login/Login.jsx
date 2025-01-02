import { useContext, useEffect, useRef, useState } from "react";
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from "../../providers/AuthProvider";

const Login = () => {
const {signin}=useContext(AuthContext)

    const handleLogin = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signin(email,password)
        .then(result =>{
            const user =result.user;
            console.log(user);
        })
    };

    const [disabled, setDisabled] = useState(true);
    const captchaRef = useRef(null);

    useEffect(() => {
        loadCaptchaEnginge(6); 
    }, []);

    const hanldeValidateCaptcha = () => {
        const value = captchaRef.current.value; 
        console.log(value);
        if (validateCaptcha(value)) { 
            setDisabled(false); 
        } else {
            alert('Captcha validation failed. Please try again.'); 
            setDisabled(true);
        }
    };

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
                    <form onSubmit={handleLogin} className="card-body">
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
                            <LoadCanvasTemplate />
                            <input
                                type="text"
                                placeholder="type the captcha here"
                                name="captcha"
                                ref={captchaRef}
                                className="input input-bordered"
                                required
                            />
                            <button onClick={hanldeValidateCaptcha} className="btn btn-outline btn-xs mt-6">
                                validate
                            </button>
                        </div>
                        <div className="form-control mt-6">
                            <input disabled={disabled} className="btn btn-primary" type="submit" value="Login" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
