import { Link, NavLink, Outlet } from "react-router-dom";
import { FaListCheck } from "react-icons/fa6";
import { IoReturnUpBack } from "react-icons/io5";
import { FaListUl } from "react-icons/fa6";
import useAuth from "../../Hook/useAuth";
import useUserInfo from "../../Hook/useUserInfo";
import { BiLogOutCircle } from "react-icons/bi";

const Dashboard = () => {
  const { user,signOutUser } = useAuth();
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
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col mt-6 md:mt-0 items-center lg:mt-20 container mx-auto md:p-4 ">
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
          <div className="menu p-4 w-80 min-h-screen md:bg-transparent !bg-[#FFF6EB]">
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
                  <button className="text-lg font-bold  flex justify-center gap-2 text-red-400 p-2 rounded-sm mt-2 left-80 hover:bg-red-100 w-full hover:text-black transition-all duration-300 top-10">
                    <span className="text-2xl">
                      <IoReturnUpBack />
                    </span>
                     Home
                  </button>
                </Link>
                <button onClick={handleSignOut} className="w-full text-lg font-bold  flex justify-center gap-2 text-red-400 p-2 rounded-sm mt-2 left-80 hover:bg-red-100 hover:text-black transition-all duration-300 top-10">
                    <span className="text-2xl">
                      <BiLogOutCircle />
                    </span>{" "}
                    Sign Out
                  </button>
              </div>
            </div>
            {/* Routes Based on Role */}
            {userInfo?.role === "client" ? (
              <>
                <NavLink to={"/dashboard/addJob"}>
                  <button className="text-center py-2 bg-red-100 px-12  flex items-center mt-10 justify-between min-w-full">
                    <FaListCheck className="mr-4"></FaListCheck> Add Job
                  </button>
                </NavLink>
                <NavLink to={"/dashboard/myPostedJob"}>
                  <button className="text-center py-2 bg-red-100 px-12  flex items-center mt-10 justify-between min-w-full">
                    <FaListCheck className="mr-4"></FaListCheck> My Posted job
                  </button>
                </NavLink>
                <NavLink to={"/dashboard/bidRequest"}>
                  <button className="text-center py-2 bg-red-100 px-12  flex items-center mt-10 justify-between min-w-full">
                    <FaListCheck className="mr-4"></FaListCheck> Bid Requests
                  </button>
                </NavLink>
              </>
            ) : userInfo.role==="freelancer"?(
              <>
              <NavLink to={"/dashboard/myBids"}>
                  <button className="text-center py-2 bg-red-100 px-12  flex items-center mt-10 justify-between min-w-full">
                    <FaListCheck className="mr-4"></FaListCheck> My Bids
                  </button>
                </NavLink>
                <NavLink to={"/dashboard/myPostedJob"}>
                  <button className="text-center py-2 bg-red-100 px-12  flex items-center mt-10 justify-between min-w-full">
                    <FaListCheck className="mr-4"></FaListCheck> Bookmarks
                  </button>
                </NavLink>
              </>
            ):''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
