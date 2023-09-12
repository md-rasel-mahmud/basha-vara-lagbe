import { Link } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin";
const Login = () => {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen">
      <h2 className="text-5xl uppercase font-semibold text-secondary mb-2">
        Login
      </h2>
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-300">
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered"
            />
            <label className="label">
              New here?
              <Link
                to="/auth/sign-up"
                className="text-info hover:!text-warning hover:underline"
              >
                Sign Up here
              </Link>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
          <div className="divider">OR</div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
