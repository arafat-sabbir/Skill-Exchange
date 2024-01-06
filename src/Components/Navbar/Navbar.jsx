import { Link, NavLink } from "react-router-dom";
import "../Navbar/Navbar.css";
import useAuth from "../../Hook/useAuth";

const Navbar = () => {


  const { user, signOutUser } = useAuth();
  const handleSignOut = () => {
    signOutUser()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      {user && (
        <ul className="lg:flex">
          <li>
            <NavLink to={"/addJob"}>Add Job</NavLink>
          </li>
          <li>
            <NavLink to={"/myPostedJob"}>My Posted Job</NavLink>
          </li>
          <li>
            <NavLink to={"/myBids"}>My Bids</NavLink>
          </li>
          <li>
            <NavLink to={"/bidRequest"}>Bid Requests</NavLink>
          </li>
          <li>
            <NavLink to={"/bookmark"}>My Bookmark</NavLink>
          </li>
          <li>
            <NavLink to={"/dashBoard"}>DashBoard</NavLink>
          </li>
        </ul>
      )}
    </>
  );
  return (
    <div>
      <div className="navbar  justify-center  py-6  container mx-auto ">
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
              className="menu menu-sm dropdown-content font-semibold mx-2 mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>
          <div className="hidden lg:flex text-main font-bold items-center">
          <NavLink
            to={"/"}
              className="!flex  font-bold items-center"
            >
              <img
                className="w-10 h-10"
                src="https://i.ibb.co/8m1d6zD/Untitled-design.png"
                alt=""
              />
              <p className="text-2xl text-black  font-semibold">Skill Exchange</p>
            </NavLink>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal  font-semibold gap-4 px-1">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-bottom dropdown-end">
            <label tabIndex={0} className="">
              {user && (
                <img
                  className="w-12 mr-4 h-12  rounded-full border-2 border-main mb-4 mt-4"
                  src={user?.photoURL ? user.photoURL : ""}
                  alt=""
                />
              )}
            </label>
            {user && (
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-56">
                <img
                  className=" w-12 mx-auto  rounded-full mb-2 mt-2 border-2 border-main"
                  src={user?.photoURL ? user.photoURL : ""}
                  alt=""
                />
                <p className="font-semibold text-center mr-2 mb-2 text-main ">
                  {user.displayName}
                </p>
                <p className="font-semibold text-center mr-2 mb-2  text-main ">
                  {user.email}
                </p>
                <button
                  onClick={handleSignOut}
                  className="cursor-pointer w-11/12 mx-auto  rounded-2xl font-semibold overflow-hidden relative z-100 border border-main group px-2 py-1 mb-2"
                >
                  <span className="relative z-10 text-main group-hover:text-white text-lg duration-500">
                    Sign Out
                  </span>
                  <span className="absolute w-full h-full bg-main -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                  <span className="absolute w-full h-full bg-main -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
                </button>
              </ul>
            )}
          </div>
          {user ? (
            ""
          ) : (
            <div>
              <Link to={"/signIn "} className="">
                <button className="cursor-pointer rounded-full font-semibold overflow-hidden relative z-100 border border-main group px-4 py-1">
                  <span className="relative z-10 text-main group-hover:text-white text-lg duration-500">
                    Sign In
                  </span>
                  <span className="absolute w-full h-full bg-main -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                  <span className="absolute w-full h-full bg-main -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
