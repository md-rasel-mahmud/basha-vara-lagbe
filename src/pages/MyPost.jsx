import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { useGetPostsByEmailQuery } from "../redux/apiServices/user.service";

const MyPost = () => {
  const { user } = useContext(AuthContext);
  const { data, isSuccess, isLoading, isError } = useGetPostsByEmailQuery(
    user?.email
  );
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loading loading-bars loading-lg"></div>
        </div>
      ) : (
        isSuccess && (
          <div className="container mx-auto grid p-5 bg-white/5 m-5 rounded-lg grid-cols-2 gap-3">
            {data?.map((myData) => (
              <div
                key={myData._id}
                className="card card-side bg-base-100 shadow-xl"
              >
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
        )
      )}
      {data?.length <= 0 && (
        <div className="text-center py-5 my-2 bg-red-500/10 ">
          <h2 className="text-error text-5xl my-2">
            You did&apos;nt add any post
          </h2>
          <Link className="btn btn-primary btn-sm" to="/add-post">
            Add a post
          </Link>
        </div>
      )}

      {isError && (
        <h2 className="text-error text-center text-5xl py-5 bg-red-500/10">
          Error
        </h2>
      )}
    </>
  );
};

export default MyPost;
