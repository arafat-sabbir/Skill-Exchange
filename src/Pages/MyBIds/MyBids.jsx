import { useQueryClient, useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import useAuth from "../../Hook/useAuth";
import { Helmet } from "react-helmet";
import { FcCancel } from "react-icons/fc";
import { MdOutlinePendingActions } from "react-icons/md";
import { ProgressBar } from "react-step-progress-bar";

const MyBids = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const bidderEmail = user?.email;
  const axios = useAxios();
  const getJobs = async () => {
    const response = axios.get(
      `/getMyBid?bidderEmail=${bidderEmail}&sortfield=${data?.data.biddingStatus}`
    );
    return response;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["Jobs", user],
    queryFn: getJobs,
  });
  const handleComplete = (id) => {
    axios
      .patch(`/complete-status/${id}`, { status: "Completed" })
      .then((res) => {
        queryClient.invalidateQueries(["Jobs", user]);
      });
  };
  return (
    <div className="container mx-auto">
      <Helmet>
        <title>Skill Exchange || My Bids</title>
      </Helmet>
      <div className=" w-[286px] my-20 text-center mx-auto h-[56px] bg-no-repeat flex bg-hero-pattern">
        <h3 className="text-white text-2xl ml-[100px]  mt-3  font-bold">
          My Bids
        </h3>
      </div>
      {isLoading ? (
       <div className="flex justify-center items-center">
       <div className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]">
         <span className="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"></span>
       </div>
     </div>
      ) : (
        <div className="flex flex-col justify-center ">
          <div className="flex flex-col mb-52">
            <div className="-m-1.5 overflow-x-auto  ">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="border overflow-hidden dark:border-gray-700 rounded-xl">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Job Title
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          Seller Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          DeadLine
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {!isLoading &&
                        data?.data?.map((MyBids) => (
                          <tr key={MyBids?._id}>
                            <td className="p-4">{MyBids.jobtitle}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {MyBids?.sellerEmail}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                              {MyBids?.biddingdeadline}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                              {MyBids?.biddingStatus}
                            </td>
                            <td className=" whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                              {MyBids.biddingStatus === "In Progress" ? (
                                <button
                                  onClick={() => handleComplete(MyBids?._id)}
                                  className="cursor-pointer rounded-xl font-semibold overflow-hidden relative z-100 border border-main group px-4 py-1"
                                >
                                  <span className="relative z-10 text-main group-hover:text-white text-sm duration-500">
                                    Complete
                                  </span>
                                  <span className="absolute w-full h-full bg-main -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                                  <span className="absolute w-full h-full bg-main -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
                                </button>
                              ) : MyBids.biddingStatus === "Canceled" ? (
                                <h3 className="flex my-4 items-center ">
                                  <FcCancel></FcCancel>Bid Canceled
                                </h3>
                              ) : MyBids.biddingStatus === "Pending" ? (
                                <h3 className="flex text-xs items-center">
                                  <MdOutlinePendingActions className=""></MdOutlinePendingActions>
                                  Pending Approval
                                </h3>
                              ) : MyBids.biddingStatus === "Completed" ? (
                                <div className="w-[100px]">
                                  <ProgressBar
                                    percent={100}
                                    filledBackground="#007456"
                                  />
                                </div>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBids;
