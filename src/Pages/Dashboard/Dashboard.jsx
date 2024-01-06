import { Link, NavLink, Outlet } from "react-router-dom";
import { FaListCheck } from "react-icons/fa6";
import { IoReturnUpBack } from "react-icons/io5";
import { FaListUl } from "react-icons/fa6";
import useAuth from "../../Hook/useAuth";

const Dashboard = () => {
  const { user } = useAuth()
  return (
    <div className="flex">

<div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col mt-6 md:mt-0 items-center lg:mt-20 container mx-auto md:p-4 ">
    {/* Page content here */}
    <Outlet></Outlet>
    <label htmlFor="my-drawer-2" className=" btn bg-black text-white border-y-4 border-y-main drawer-button lg:hidden absolute top-4 left-4"><FaListUl></FaListUl></label>
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
    <div className="menu p-4 w-80 min-h-full md:bg-transparent !bg-[#FFF6EB]">
      {/* Sidebar content here */}
      <div className="absolute  bottom-4 flex ml-16 flex-col justify-center items-center">
          <img
            src={user?.photoURL}
            className="h-20 w-20 border-2 border-main  rounded-full mx-auto "
            alt=""
          />
          <h1 className="font-semibold text-xl mt-2">{user?.displayName}</h1>
          <Link to={'/'}>
          <button className=" text-black font-semibold flex justify-center gap-2 bg-red-100 p-2 rounded-sm mt-2 left-96 top-10">
          {" "}
          <span className="text-2xl">
            <IoReturnUpBack />
          </span>{" "}
          Back To Home
        </button>
          </Link>
        </div>

        <Link to={"/"} className="flex justify-center items-center hover:flex mt-4">
          <img
            src="https://i.ibb.co/8m1d6zD/Untitled-design.png"
            className="w-10 h-10"
            alt=""
          />
          <div className="px-2  mx-2 lg:mx-0 font-bold text-2xl">
            Skill Exchange
          </div>
        </Link>
        <NavLink to={"/dashboard/tasks"}>
          <button className="text-center py-2 bg-red-100 px-12  flex items-center mt-10 justify-between min-w-full">
            <FaListCheck className="mr-4"></FaListCheck> Tasks
          </button>
        </NavLink>
    </div>
  
  </div>
</div>



      {/* <div className="w-[280px]  h-screen px-10 pt-12 flex flex-col  items-center fixed">
        <div className="absolute bottom-4 flex flex-col justify-center items-center">
          <img
            src={userinfo.photo}
            className="h-20 w-20 border-2 border-main  rounded-full mx-auto "
            alt=""
          />
          <h1 className="font-semibold text-xl mt-2">{userinfo.name}</h1>
          <Link to={'/'}>
          <button className=" text-black font-semibold flex justify-center gap-2 bg-[#FDF0EC] p-2 rounded-sm mt-2 left-96 top-10">
          {" "}
          <span className="text-2xl">
            <IoReturnUpBack />
          </span>{" "}
          Back To Home
        </button>
          </Link>
        </div>

        <Link to={"/"} className="flex justify-center items-center min-w-full">
          <img
            src="https://i.ibb.co/Syy2tpj/logo.png"
            className="w-[40px] h-[40px]"
            alt=""
          />
          <div className="px-2  mx-2 lg:mx-0 font-bold text-2xl">
            Task Vault
          </div>
        </Link>
        <NavLink to={"/dashboard/tasks"}>
          <button className="text-center bg-[#FBF1E6] px-12 py-1 flex items-center mt-10 justify-between min-w-full">
            <FaListCheck className="mr-4"></FaListCheck> Tasks
          </button>
        </NavLink>
      </div>
      <div className=" ml-[280px] px-16 pt-24 w-full">
        
      </div> */}
    </div>
  );
};

export default Dashboard;
