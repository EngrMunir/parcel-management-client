import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext} from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile}= useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data =>{
        console.log(data);
        reset();
        createUser(data.email, data.password)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
            updateUserProfile(data.name, data.photoURL)
            .then(()=>{
                // create user entry in the database
                const userInfo={
                    name: data.name,
                    email: data.email
                }
                axiosPublic.post('/users', userInfo)
                .then(res =>{
                    if(res.data.insertedId){
                        console.log('user added to the database');
                    reset();
                    Swal.fire({
                        position:'top-end',
                        icon: 'success',
                        title:'User Created Successfully',
                        showConfirmButton: false,
                        timer:1500
                    });
                    navigate('/');
                    }
                })                
            })
        })
    }
    
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input name="name" type="text" {...register("name", {required: true})} placeholder="Name" className="input input-bordered" />
                        {errors.name && <span className="text-red-600">Name is required </span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email", {required:true})} placeholder="email" className="input input-bordered"  />
                        {errors.name && <span className="text-red-600">Email is required </span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="text" {...register("photoURL")} placeholder="photo url" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password"  {...register("password", {required:true,
                             minLength: 6, 
                             maxLength: 20,
                             pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                             })} placeholder="password" className="input input-bordered" />
                        {errors.password?.type ==='required' && <p className="text-red-600">Password is required</p>}
                        {errors.password?.type ==='minLength' && <p className="text-red-600">Password must be at least 6 character</p>}
                        {errors.password?.type ==='maxLength' && <p className="text-red-600">Password must be at most 20 character</p>}
                        {errors.password?.type ==='pattern' && <p className="text-red-600">Password must be at least one uppercase, one lowercase, one digit and one special character</p>}
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <input className="btn btn-primary" type="submit" value="Register" />
                    </div>
                </form>
                <p className="text-center mb-4">Already Register?<Link to="/login">  <small className="text-blue-500">Login</small> </Link></p>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    </div>
    );
};

export default SignUp;