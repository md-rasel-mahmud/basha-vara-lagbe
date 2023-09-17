import { useState } from "react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { usePostUserMutation } from "../redux/apiServices/user.service";

const SocialLogin = () => {
  const { signInWithGooglePopup } = useContext(AuthContext);
  const [setUserData, { data: responseData }] = usePostUserMutation();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleGooglePopup = () => {
    setLoading(true);
    signInWithGooglePopup().then(({ user }) => {
      if (user) {
        setUserData({
          email: user?.email,
          name: user?.displayName,
          image: user?.photoURL,
          uid: user?.uid,
        });
      }
    });
  };
  useEffect(() => {
    if (responseData) {
      setLoading(false);
      navigate("/");
    }
  }, [responseData]);
  return (
    <button
      onClick={handleGooglePopup}
      type="button"
      className="btn bg-white text-black hover:text-white hover:bg-secondary"
      disabled={loading}
    >
      <FaGoogle /> Sign in or sign up with Google{" "}
      {loading && <span className="loading loading-bars loading-md"></span>}
    </button>
  );
};

export default SocialLogin;
