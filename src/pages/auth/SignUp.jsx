import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Resizer from "react-image-file-resizer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { usePostUserMutation } from "../../redux/apiServices/user.service";

const SignUp = () => {
  const { signUpWithEmailPass } = useContext(AuthContext);
  const [isShowPass, setIsShowPass] = useState(false);
  const [setUserData, { data: responseData }] = usePostUserMutation();
  const [isImage, setIsImage] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    pass: "",
    confirmPass: "",
    name: "",
    image: "",
    phone: "",
  });
  const [errorMsg, setErrorMsg] = useState({
    email: "",
    pass: "",
    confirmPass: "",
    name: "",
    phone: "",
  });

  const navigate = useNavigate();

  // picture converter function
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        250,
        250,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const handleInputValidate = async (e) => {
    const { name, value } = e.target;

    if (e?.target?.files) {
      try {
        const file = await resizeFile(e.target.files[0]);
        await setIsImage(file);
      } catch (err) {
        console.log(err);
      }
    }

    if (!value) {
      setErrorMsg({ ...errorMsg, [name]: "This field is required" });
    } else {
      setErrorMsg({ ...errorMsg, [name]: "" });
    }

    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (formData.pass !== formData.confirmPass) {
      setErrorMsg({
        ...errorMsg,
        confirmPass: "Password doesn't match",
      });
    } else {
      setErrorMsg({ ...errorMsg, confirmPass: "" });
    }
    if (!formData.confirmPass) {
      setErrorMsg({ ...errorMsg, confirmPass: "This field is required" });
    }

    if (formData.pass.length < 6 && formData.confirmPass.length < 6) {
      setErrorMsg({
        ...errorMsg,
        confirmPass: "password minimum 6 character",
        pass: "password minimum 6 character",
      });
    }
  }, [formData.pass, formData.confirmPass]);

  useEffect(() => {
    if (
      (formData.email && !formData.email.includes("@")) ||
      !formData.email.includes(".")
    ) {
      setErrorMsg({ ...errorMsg, email: "Invalid email address" });
    } else {
      setErrorMsg({ ...errorMsg, email: "" });
    }
    if (!formData.email) {
      setErrorMsg({ ...errorMsg, email: "This field is required" });
    }
  }, [formData.email]);

  // form submit event
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        setErrorMsg((pre) => {
          return { ...pre, [key]: "This field is required" };
        });
        delete errorMsg.image;
      }
    });

    // set image
    isImage ? (formData.image = isImage) : delete formData.image;

    // validate required filed
    const isFormValue = Object.values(formData).filter((item) => item === "");
    const isErrorMsg = Object.values(errorMsg).filter((item) => item !== "");

    if (isFormValue.length > 0 || isErrorMsg.length > 0) {
      setLoading(false);
      return;
    } else {
      console.log(formData);
      signUpWithEmailPass(formData.email, formData.pass)
        .then(({ user }) => {
          if (user) {
            console.log(user);
            setUserData(formData);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };
  useEffect(() => {
    if (responseData) {
      setLoading(false);
      navigate("/");
    }
  }, [responseData]);

  return (
    <div className="flex justify-center items-center flex-col min-h-screen">
      <h2 className="text-5xl uppercase font-semibold text-secondary mb-2">
        Sign Up
      </h2>
      <form
        onSubmit={handleSubmit}
        className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-300"
      >
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className={`input input-bordered ${
                errorMsg.name && "border-error"
              }`}
              onChange={handleInputValidate}
            />
            {errorMsg.name && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errorMsg.name}
                </span>
              </label>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className={`input input-bordered ${
                errorMsg.email && "border-error"
              }`}
              onChange={handleInputValidate}
            />
            {errorMsg.email && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errorMsg.email}
                </span>
              </label>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input
              type="number"
              name="phone"
              placeholder="Enter your Phone Number"
              className={`input input-bordered ${
                errorMsg.phone && "border-error"
              }`}
              onChange={handleInputValidate}
            />
            {errorMsg.phone && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errorMsg.phone}
                </span>
              </label>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Pick a Image</span>
            </label>
            <input
              type="file"
              name="image"
              className="file-input file-input-bordered w-full max-w-xs"
              onChange={handleInputValidate}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Create Password</span>
            </label>
            <input
              type={isShowPass ? "text" : "password"}
              name="pass"
              placeholder="Create password"
              className={`input input-bordered ${
                errorMsg.pass && "border-error"
              }`}
              onChange={handleInputValidate}
            />
            {errorMsg.pass && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errorMsg.pass}
                </span>
              </label>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type={isShowPass ? "text" : "password"}
              name="confirmPass"
              placeholder="Confirm password"
              className={`input input-bordered ${
                errorMsg.confirmPass && "border-error"
              }`}
              onChange={handleInputValidate}
            />

            {errorMsg.confirmPass && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errorMsg.confirmPass}
                </span>
              </label>
            )}
            <div>
              {" "}
              <button
                type="button"
                className="btn btn-sm my-2"
                onClick={() => setIsShowPass(!isShowPass)}
              >
                {isShowPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary" disabled={loading}>
              Sign Up
              {loading && (
                <span className="loading loading-bars loading-md"></span>
              )}
            </button>
          </div>
          <label className="label">
            Already have an account?
            <Link
              to="/auth/login"
              className="text-info hover:!text-warning hover:underline"
            >
              Login here
            </Link>
          </label>
          <div className="divider">OR</div>
          <SocialLogin />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
