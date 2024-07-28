
const Login = () => {
    return (
        <div>
        <div className="mx-auto md:w-1/2">
            <h2 className="text-3xl mb-6 text-center">Please Register</h2>
            <form>
                <input type="email" placeholder="Email" className="border w-full mb-4 py-2 px-4"/>
                <br />
                <input type="password" placeholder="Password" className="border w-full mb-4 py-2 px-4"/>
            </form>
        </div>
    </div>
    );
};

export default Login;