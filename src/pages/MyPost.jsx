import { useContext } from "react";
import { useGetPostsByEmailQuery } from "../redux/features/baseApi";
import { AuthContext } from "../context/AuthProvider";

const MyPost = () => {
  const { user } = useContext(AuthContext);
  const { data } = useGetPostsByEmailQuery(user?.email);
  return (
    <div className="container mx-auto grid p-5 bg-white/5 m-5 rounded-lg grid-cols-2 gap-3">
      {data?.map((myData) => (
        <div key={myData._id} className="card card-side bg-base-100 shadow-xl">
          <figure>
            <img
              src={myData?.image}
              className="object-cover object-top h-56 w-72"
              alt="Movie"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{myData?.name}</h2>
            <p>{myData?.description}</p>
            <div className="card-actions ">
              <button className="btn btn-error btn-sm">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyPost;
