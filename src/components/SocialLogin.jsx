import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { signInWithGooglePopup } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleGooglePopup = () => {
    signInWithGooglePopup().then((result) => {
      const { user } = result;

      navigate("/");
      console.log(user);
    });
  };
  return (
    <div className="flex justify-center gap-2 text-3xl">
      <button
        onClick={handleGooglePopup}
        className="bg-success p-4 hover:bg-primary  text-white rounded-full"
      >
        <FaGoogle />
      </button>
    </div>
  );
};

export default SocialLogin;
