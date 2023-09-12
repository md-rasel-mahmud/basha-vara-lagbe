import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";
import { useLazyGetPostsQuery } from "../redux/features/baseApi";
import { useEffect, useState } from "react";

const Banner = () => {
  const [pagination, setPagination] = useState(0);
  const [postData, setPostData] = useState(null);
  const [setPageId, { data: postsInfos, isLoading }] = useLazyGetPostsQuery();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setPageId(pagination);
    if (postsInfos) {
      setPostData(postsInfos);
    }
    if (postsInfos?.length <= 0) {
      setErrorMsg("No post found");
    } else {
      setErrorMsg("");
    }
  }, [pagination, setPageId, postsInfos]);

  // console.log(isLoading);
  return (
    <>
      <div className="grid grid-cols-3 gap-3 container mx-auto p-5 m-5 bg-white/5 rounded-lg">
        {postData?.map((postInfo) => (
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
      {errorMsg && (
        <h2 className="text-error text-center text-5xl py-5 bg-red-500/10">
          {errorMsg}
        </h2>
      )}
      <div className="flex gap-3 justify-center w-full items-center py-3">
        <button
          disabled={pagination <= 0}
          className={`btn btn-accent btn-sm ${
            isLoading && "loading loading-bars loading-xs"
          }`}
          onClick={() => setPagination(pagination - 1)}
        >
          <FaArrowAltCircleLeft /> previous page
        </button>
        <h4 className="uppercase font-semibold">Current Page: {pagination}</h4>
        <button
          className={`btn btn-accent btn-sm ${
            isLoading && "loading loading-bars loading-xs"
          }`}
          disabled={postsInfos?.length <= 0}
          onClick={() => setPagination(pagination + 1)}
        >
          Next Page <FaArrowAltCircleRight />
        </button>
      </div>
    </>
  );
};

export default Banner;
