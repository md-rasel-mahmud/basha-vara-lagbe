import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const SignUp = () => {
  const { signInWithGooglePopup } = useContext(AuthContext);
  const handleGooglePopup = () => {
    signInWithGooglePopup.then(() => {}).then((data) => console.log(data));
  };
  return (
    <div className="flex justify-center items-center flex-col min-h-screen">
      <h2 className="text-5xl uppercase font-semibold text-secondary mb-2">
        Sign Up
      </h2>
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-300">
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered border-error"
            />
            <label className="label">
              <span className="label-text-alt text-error">Error</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              className="input input-bordered border-error"
            />
            <label className="label">
              <span className="label-text-alt text-error">Error</span>
            </label>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Pick a Image</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered border-error w-full max-w-xs"
            />
            <label className="label">
              <span className="label-text-alt text-error">Error</span>
            </label>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Create Password</span>
            </label>
            <input
              type="text"
              placeholder="Create password"
              className="input input-bordered"
            />
            <label className="label">
              Already have an account?
              <Link
                to="/auth/login"
                className="text-info hover:!text-warning hover:underline"
              >
                Login here
              </Link>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Sign Up</button>
          </div>
          <div className="divider">OR</div>
          <div className="flex justify-center gap-2 text-3xl">
            <button
              onClick={handleGooglePopup}
              className="bg-success p-4 hover:bg-primary  text-white rounded-full"
            >
              <FaGoogle />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
