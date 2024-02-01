import { Link, NavLink, Outlet } from "react-router-dom";
import { FaListCheck } from "react-icons/fa6";
import { IoReturnUpBack } from "react-icons/io5";
import { FaListUl, FaListOl, FaCodePullRequest } from "react-icons/fa6";
import useAuth from "../../Hook/useAuth";
import useUserInfo from "../../Hook/useUserInfo";
import { BiLogOutCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoAddSharp } from "react-icons/io5";
import { useEffect } from "react";


const Dashboard = () => {
  // Get the theme2 value for setting on the html class for dark mode
  const theme2 = localStorage.getItem("theme2")
  const theme = localStorage.getItem("theme")
  //set the theme2 value for setting on the html class for dark mode
  useEffect(() => {
    document.querySelector("html").classList.remove(...document.querySelector("html").classList);
    document.querySelector("html").classList.add(theme2)
    document.querySelector("html").setAttribute("data-theme", theme)
  }, [theme2,theme])
  console.log(theme2);
  const { user, signOutUser } = useAuth();
  const { userInfo } = useUserInfo();
  const handleSignOut = () => {
    signOutUser()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex">
      <div className="drawer lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content !h-full">
          {/* Page content here */}
          <Outlet></Outlet>
          <label
            htmlFor="my-drawer-2"
            className=" btn bg-black text-white border-y-4 border-y-main drawer-button lg:hidden absolute top-4 left-4"
          >
            <FaListUl></FaListUl>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu  p-4 w-80 min-h-screen  bg-[#F2FFE9] dark:bg-gray-800">
            {/* Sidebar content here */}
            <div className=" top-10 flex  flex-col justify-center items-center">
              {/* Logo and name */}
              <Link
                to={"/"}
                className="flex justify-center items-center hover:flex mt-4"
              >
                <img
                  src="https://i.ibb.co/8m1d6zD/Untitled-design.png"
                  className="w-20 h-20"
                  alt=""
                />
              </Link>
              {/* User info */}
              <div className="flex mt-8 gap-2 items-center">
                <img
                  src={user?.photoURL}
                  className="h-14 w-14  rounded-full mx-auto "
                  alt=""
                />
                <div>
                  <h1 className="font-semibold text-xl mt-2">
                    {user?.displayName}
                  </h1>
                  <h3>{userInfo.creationDate}</h3>
                </div>
              </div>
              {/* Navigation */}
              <div className="absolute bottom-4  w-full flex flex-col items-center">
                <Link to={"/"} className="w-full">
                  <button className="text-lg font-bold  flex justify-center gap-2 text-green-700 px-2 py-1 rounded-sm mt-2 left-80 hover:bg-red-100 hover:scale-95 dark:text-slate-300 dark:bg-gray-700 w-full hover:text-black transition-all duration-300 top-10">
                    <span className="text-2xl">
                      <IoReturnUpBack />
                    </span>
                    Home
                  </button>
                </Link>
                <button onClick={handleSignOut} className="w-full hover:scale-95 text-lg font-bold  flex justify-center gap-2 text-green-700 px-2 py-1 rounded-sm mt-2 left-80 hover:bg-red-100 dark:text-slate-300 dark:bg-gray-700 hover:text-black transition-all duration-300 top-10">
                  <span className="text-2xl">
                    <BiLogOutCircle />
                  </span>{" "}
                  Sign Out
                </button>
              </div>
            </div>
            {/* Routes Based on Role */}
            {/* Global Route */}
            <NavLink to={"/dashboard/profile"}>
              <button className="text-center py-2 bg-red-100 dark:text-slate-300 dark:bg-gray-700 px-12  flex items-center mt-10 justify-center text-[15px] font-medium min-w-full">
                <CgProfile className="mr-4 text-lg"></CgProfile>Profile
              </button>
            </NavLink>
            {userInfo?.role === "client" ? (
              <>
                <NavLink to={"/dashboard/addJob"}>
                  <button className="text-center py-2 bg-red-100 dark:text-slate-300 dark:bg-gray-700 px-12  flex items-center mt-10 justify-center text-[15px] font-medium min-w-full">
                    <IoAddSharp className="mr-4 text-lg"></IoAddSharp> Add Job
                  </button>
                </NavLink>
                <NavLink to={"/dashboard/myPostedJob"}>
                  <button className="text-center py-2 bg-red-100 dark:text-slate-300 dark:bg-gray-700 px-12  flex items-center mt-10 justify-center text-[15px] font-medium min-w-full">
                    <FaListOl className="mr-4"></FaListOl> My Posted job
                  </button>
                </NavLink>
                <NavLink to={"/dashboard/bidRequest"}>
                  <button className="text-center py-2 bg-red-100 dark:text-slate-300 dark:bg-gray-700 px-12  flex items-center mt-10 justify-center text-[15px] font-medium min-w-full">
                    <FaCodePullRequest className="mr-4"></FaCodePullRequest> Bid Requests
                  </button>
                </NavLink>
              </>
            ) : userInfo.role === "freelancer" ? (
              <>
                <NavLink to={"/dashboard/myBids"}>
                  <button className="text-center py-2 bg-red-100 dark:text-slate-300 dark:bg-gray-700  flex items-center mt-10 justify-center text-[15px] font-medium min-w-full">
                    <FaListCheck className="mr-4"></FaListCheck> My Bids
                  </button>
                </NavLink>
                <NavLink to={"/dashboard/bookmarks"}>
                  <button className="text-center py-2 bg-red-100 dark:text-slate-300 dark:bg-gray-700   flex items-center mt-10 justify-center text-[15px] font-medium min-w-full">
                    <FaListCheck className="mr-4"></FaListCheck> Bookmarks
                  </button>
                </NavLink>
              </>
            ) : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
