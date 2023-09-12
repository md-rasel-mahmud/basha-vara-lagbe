import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { useGetPostsQuery } from "../redux/features/baseApi";

const Banner = () => {
  const { data } = useGetPostsQuery(1);

  console.log(data);

  return (
    <div className="grid grid-cols-3 gap-3 container mx-auto p-5 m-5 bg-white/5 rounded-lg">
      {data?.map((postInfo) => (
        <div key={postInfo._id} className="card  bg-base-100 shadow-xl">
          <figure className=" ">
            <img
              className="object-cover object-top  h-72 w-full"
              src={postInfo?.image}
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              <div className="badge badge-primary">
                <FaUser />
              </div>
              {postInfo?.name}
            </h2>
            <p>
              {postInfo?.description.length <= 1 ? (
                postInfo?.description
              ) : (
                <>
                  {postInfo?.description.slice(0, 20)}{" "}
                  <button className="underline text-accent hover:text-success hover:no-underline">
                    Read more..
                  </button>
                </>
              )}
            </p>
            <div className="card-actions justify-end">
              <div className="badge gap-2 badge-outline badge-secondary">
                <FaPhoneAlt /> {postInfo.phone}
              </div>
              <div className="badge badge-outline">Products</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
