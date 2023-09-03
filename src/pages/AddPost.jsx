import { useState } from "react";

const AddPost = () => {
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ image, description });
  };

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
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Choose Image</span>
            </label>

            <input
              type="file"
              className="file-input file-input-bordered w-full "
              required
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Write Description</span>
            </label>

            <textarea
              className="textarea textarea-bordered"
              placeholder="Bio"
              required
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Add Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
