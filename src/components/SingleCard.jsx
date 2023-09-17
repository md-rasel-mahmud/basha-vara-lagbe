import { useState } from "react";
import { FaPhoneAlt, FaUser } from "react-icons/fa";

const SingleCard = ({ postInfo }) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <>
      <div className="card  bg-base-100 shadow-xl">
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
                {!readMore
                  ? postInfo?.description.slice(0, 5)
                  : postInfo?.description}
                <button
                  onClick={() => setReadMore(!readMore)}
                  className="underline text-accent hover:text-success hover:no-underline"
                >
                  <span className="ml-2">
                    {readMore ? "Read Less ..." : "Read more..."}
                  </span>
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
    </>
  );
};

export default SingleCard;
