import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
const Login = () => {
  const { manuallyLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = { email, pass };
    manuallyLogin(email, pass).then(({ user }) => {
      if (user) {
        navigate("/");
      }
    });
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center flex-col min-h-screen">
      <h2 className="text-5xl uppercase font-semibold text-secondary mb-2">
        Login
      </h2>
      <form
        onSubmit={handleSubmit}
        className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-300"
      >
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered"
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPass(e.target.value)}
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
          <div className="divider"></div>
          <Link to="/" className="btn btn-secondary">
            Back to Home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
