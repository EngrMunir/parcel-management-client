import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const Login = () => {
    const { signIn }= useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogin = e =>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password);
        signIn(email, password)
        .then(result=>{
            const user = result.user;
            console.log(user);
            navigate('/')
            Swal.fire({
                title: "User LoggedIn Successful",
                showClass: {
                  popup: `
                    animate__animated animate__fadeInUp animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated animate__fadeOutDown animate__faster
                  `
                },
                
              });
        })

    }
    return (
        <div className="hero bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <div className="card shrink-0  bg-base-100">
                <form onSubmit={handleLogin} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-4">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
                <p className="text-center mb-2"><small>New here? Please <Link to="/signUp">Register</Link> </small></p>
                <SocialLogin></SocialLogin>
    </div>
  </div>
        
</div>
    );
};

export default Login;