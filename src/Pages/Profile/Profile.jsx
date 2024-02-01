import useUserInfo from "../../Hook/useUserInfo";

const Profile = () => {
  const { userInfo } = useUserInfo();
  console.log(userInfo);
  return (
    <div className="w-full flex justify-center items-center h-full">
      <div className=" flex  flex-col md:flex-row  my-20">
        <div className="relative max-w-[350px] group">
          <img
            className="rounded-lg transform scale-105"
            src={userInfo.userPhoto}
            alt="img"
          />
          <span className="absolute top-4 right-2 py-1 px-4 bg-[#0d87f8] z-20 text-sm  text-white rounded-full shadow-[0px_0px_5px_0px_#0d87f8]">
            {userInfo.role}
          </span>
        </div>
        <div className="space-y-12 max-w-[350px] my-auto rounded-tr-lg rounded-br-lg md:w-[350px] dark:bg-gray-900 text-center p-10 shadow-[0px_7px_30px_2px_rgba(100,100,111,0.2)]">
          <div className="space-y-4">
            <h2 className="text-3xl font-medium dark:text-slate-300 text-gray-700 text-center font-sans">
               {userInfo.userName}
            </h2>
            <p className="font-sans dark:text-slate-300  text-gray-500"> Email:{userInfo.userEmail}</p>
          <h3 className="dark:text-slate-300">User Since : {userInfo.creationDate}</h3>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
