import { useQueryClient, useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import useAuth from "../../Hook/useAuth";
import { Helmet } from "react-helmet";
import { FcCancel } from "react-icons/fc";
import { MdOutlinePendingActions } from "react-icons/md";
import { ProgressBar } from "react-step-progress-bar";
import UseLoading from "../../Hook/useLoading";

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
    <div className="lg:container w-[97vw] mx-auto">
      <Helmet>
        <title>Skill Exchange || My Bids</title>
      </Helmet>
      <h3 className=" my-16 font-semibold text-3xl text-center">My Bids</h3>
      {isLoading ? (
        <UseLoading></UseLoading>
      ) : (
        <div className="border dark:border-gray-500 overflow-x-scroll lg:overflow-x-hidden rounded-xl">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase">
                  Job Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase"
                >
                  Seller Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase"
                >
                  DeadLine
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-500 ">
              {!isLoading &&
                data?.data?.map((MyBids) => (
                  <tr key={MyBids?._id}>
                    <td className="p-4">{MyBids.jobtitle}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-slate-300 ">
                      {MyBids?.sellerEmail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-slate-300 ">
                      {MyBids?.biddingdeadline}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-slate-300 ">
                      {MyBids?.biddingStatus}
                    </td>
                    <td className=" whitespace-nowrap text-sm text-gray-800 dark:text-slate-300 ">
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
      )}
    </div>
  );
};

export default MyBids;
