import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => {
    const { register, handleSubmit, formState:{errors} } = useForm()
    const onSubmit = data =>{
        console.log(data)
    }
    return (
        <div>
            <div className="mx-auto md:w-1/3">
                <h2 className="text-3xl mb-6 text-center">Please Register</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" {...register('name',{required:true})} placeholder="Your Name" className="border w-full mb-4 py-2 px-4" />
                    {
                        errors.name && <span className="text-red-500">Name is required</span>
                    }
                    <br />
                    <input type="text" {...register('photo',{required: true})} placeholder="Photo URL" className="border w-full mb-4 py-2 px-4"/>
                    {
                        errors.photo && <span className="text-red-500">Name is required</span>
                    }
                    <br />
                    <input type="email" {...register('email', {required: true})} placeholder="Email" className="border w-full mb-4 py-2 px-4"/>
                    {
                        errors.email && <span className="text-red-500">Name is required</span>
                    }
                    <br />
                    <input type="password" {...register('password', {required: true, minLength:6, pattern:/(?=.*[A-Z])(?=.*[a-z])/ })} placeholder="Password" className="border w-full mb-4 py-2 px-4"/>
                    {
                        errors.password?.type ==='required' && <span className="text-red-500">Password must be required</span>
                    }
                    {
                        errors.password?.type ==='minLength' && <span className="text-red-500">Password must be at least six character</span>
                    }
                    {
                        errors.password?.type ==='pattern' && <span className="text-red-500">Password must be at least one upper case, one lower case</span>
                    }
                     <input className="btn btn-secondary w-full mb-4" type="submit" value="Register" />
                </form>
                <p className="text-center mb-5">Already Registered? Please <Link className="text-blue-500" to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;