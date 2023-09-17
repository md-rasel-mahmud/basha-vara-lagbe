import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import Resizer from "react-image-file-resizer";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { usePostDataMutation } from "../redux/apiServices/post.service";

const AddPost = () => {
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [setPostData, { data: responseData, isLoading }] =
    usePostDataMutation();

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

  const handleImage = async (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      try {
        const file = await resizeFile(selectedImage);
        await setImage(file);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const name = user?.displayName;
    const email = user?.email;
    const phone = form.phone.value;
    const formData = { name, phone, image, description, email };
    setPostData(formData);
    form.reset();
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const navigate = useNavigate();
  if (responseData?.acknowledged) {
    Toast.fire({
      icon: "success",
      title: "Post successfully",
    });
    navigate("/");
  }
  return (
    <div className="card container mx-auto m-5 bg-black/5">
      <h2 className="text-2xl text-center text-secondary uppercase font-bold underline underline-offset-4">
        Add a post
      </h2>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered"
              defaultValue={user?.displayName}
              disabled
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input
              type="number"
              placeholder="Your Phone"
              className="input input-bordered"
              name="phone"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Choose Image</span>
            </label>

            <input
              type="file"
              className="file-input file-input-bordered w-full "
              onChange={handleImage}
            />
          </div>

          {image && (
            <div className="my-2">
              <img className="h-20 rounded-md" src={image} />
            </div>
          )}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Write Description</span>
            </label>

            <textarea
              className="textarea textarea-bordered"
              placeholder="Write Description"
              required
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-control mt-6">
            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-primary"
            >
              Add Post{" "}
              {isLoading && (
                <span className="loading loading-bars loading-md"></span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
