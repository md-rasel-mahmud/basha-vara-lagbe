import { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { FaEnvelope, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useGetUserQuery } from "../redux/apiServices/user.service";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { data: userData } = useGetUserQuery(user?.email, {
    skip: !user,
  });

  const navigation = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      {user && (
        <>
          <li>
            <Link to="/my-post">My Post</Link>
          </li>
          <li>
            <Link to="/add-post">Add Post</Link>
          </li>
        </>
      )}
    </>
  );
  console.log(userData);

  return (
    <div className="bg-base-100 sticky top-0 z-50 shadow-md">
      <div className="navbar ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navigation}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl uppercase">Basha Vara Lagbe</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navigation}</ul>
        </div>
        <div className="navbar-end  ">
          {!user ? (
            <Link to="/auth/login" className="btn btn-primary btn-xs">
              Login
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                onClick={() => setShowMenu(!showMenu)}
                className="btn btn-ghost btn-circle avatar"
              >
                {user?.photoURL || userData?.image ? (
                  <div className="w-10 rounded-full">
                    <img
                      src={user?.photoURL || userData?.image}
                      alt={user?.name}
                    />
                  </div>
                ) : (
                  <FaUser className="text-2xl " />
                )}
              </label>
              {showMenu && (
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a className="capitalize text-primary font-bold bg-accent/10">
                      <FaUser /> {user?.displayName || userData?.name}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${user?.email}`}
                      target="_blank"
                      rel="noreferrer noopener noreferrer"
                      className="capitalize "
                    >
                      <FaEnvelope /> {user?.email || userData?.email}
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => logout()}
                      className="text-secondary font-bold bg-secondary/10"
                    >
                      <FaSignOutAlt /> Logout
                    </a>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
