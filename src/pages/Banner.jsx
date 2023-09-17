import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import SingleCard from "../components/SingleCard";
import { useLazyGetPostsQuery } from "../redux/apiServices/post.service";

const Banner = () => {
  const [pagination, setPagination] = useState(0);
  const [postData, setPostData] = useState(null);

  const [setPageId, { data: postsInfos, isLoading, isSuccess }] =
    useLazyGetPostsQuery();
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

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loading loading-bars loading-lg"></div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 container mx-auto p-5 m-5 bg-white/5 rounded-lg">
          {postData?.map((postInfo) => (
            <SingleCard key={postInfo._id} postInfo={postInfo} />
          ))}
        </div>
      )}
      {errorMsg && (
        <h2 className="text-error text-center text-5xl py-5 bg-red-500/10">
          {errorMsg}
        </h2>
      )}
      {isSuccess && (
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
          <h4 className="uppercase font-semibold">
            Current Page: {pagination}
          </h4>
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
      )}
    </>
  );
};

export default Banner;
