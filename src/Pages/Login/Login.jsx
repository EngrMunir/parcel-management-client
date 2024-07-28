import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div>
        <div className="mx-auto md:w-1/3">
            <h2 className="text-3xl mb-6 text-center">Please Login</h2>
            <form>
                <input type="email" placeholder="Email" className="border w-full mb-4 py-2 px-4"/>
                <br />
                <input type="password" placeholder="Password" className="border w-full mb-4 py-2 px-4"/>
                <input className="btn btn-secondary w-full mb-4" type="submit" value="Login" />
            </form>
            <p className="text-center mb-5">New here? Please <Link className="text-blue-500" to="/register">Register</Link></p>
        </div>
    </div>
    );
};

export default Login;