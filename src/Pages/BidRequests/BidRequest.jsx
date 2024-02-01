import useAxios from "../../Hook/useAxios";
import useAuth from "../../Hook/useAuth";
import { Helmet } from "react-helmet";
import { MdDeleteOutline } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import UseLoading from "../../Hook/useLoading";

const BidRequest = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const userEmail = user?.email;
  const getJobs = async () => {
    const response = axios.get(`/getbidreq?bidded=1&sellerEmail=${userEmail}`);
    return response;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["Jobs", user],
    queryFn: getJobs,
  });
  const handleAcceptBid = (id) => {
    axios
      .patch(`/update-status/${id}`, { status: "In Progress" })
      .then((res) => {
        queryClient.invalidateQueries(["Jobs", user]);
      });
  };
  const handleRejectBid = (id) => {
    axios.patch(`/reject-status/${id}`, { status: "Canceled" }).then((res) => {
      console.log(res.data);
      queryClient.invalidateQueries(["Jobs", user]);
    });
  };

  return (
    <div className="lg:container w-[97vw] mx-auto">
      <Helmet>
        <title>Skill Exchange || Bid Requests</title>
      </Helmet>
      <h3 className="my-16 font-semibold text-3xl text-center">Bid Request</h3>
      {isLoading ? (
        <UseLoading></UseLoading>
      ) : (
        
        <div className="dark:border border-2 border-gray-300 rounded-xl dark:border-gray-600  overflow-x-scroll lg:overflow-hidden">
            <table className="lg:w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-slate-300 uppercase">
                  Job Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-slate-300 uppercase"
                >
                  Bidder Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-slate-300 uppercase"
                >
                  DeadLine
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-slate-300 uppercase"
                >
                  Bidded Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-slate-300 uppercase"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-slate-300 uppercase"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y lg:divide-gray-600 divider-gray-200 ">
              {data?.data.map((MyBids) => (
                <tr key={MyBids?._id}>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-sm text-gray-800 dark:text-slate-300 ">
                    {MyBids.jobtitle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-sm text-gray-800 dark:text-slate-300 ">
                    {MyBids?.bidderEmail}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-slate-300 font-semibold ">
                    {MyBids?.biddingdeadline}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-main font-semibold ">
                    ${MyBids?.biddingPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800 dark:text-slate-300 ">
                    {MyBids?.biddingStatus}
                  </td>
                  {MyBids.biddingStatus === "Canceled" ? (
                    <h3 className="flex my-4 items-center ">
                      <FcCancel></FcCancel>Bid Canceled
                    </h3>
                  ) : MyBids.biddingStatus === "In Progress" ||
                    MyBids.biddingStatus === "Completed" ? (
                    <td>
                      <div className="w-[100px]">
                        <ProgressBar
                          percent={
                            MyBids.biddingStatus === "Completed" ? 100 : 50
                          }
                          filledBackground="#007456"
                        />
                      </div>
                    </td>
                  ) : (
                    <td className="flex">
                      <button
                        onClick={() => handleAcceptBid(MyBids._id)}
                        className="mx-2 my-2 px-3 py-3 z-50 justify-center items-center gap-2 cursor-pointer rounded-full shadow-2xl text-white font-semibold bg-main hover:shadow-xl hover:shadow-main hover:scale-110 duration-300"
                      >
                        <BsCheckLg></BsCheckLg>
                      </button>
                      <button
                        onClick={() => handleRejectBid(MyBids._id)}
                        className="mx-2 my-2 px-3 py-3 z-50 justify-center items-center gap-2 cursor-pointer rounded-full shadow-2xl text-white font-semibold bg-red-500 hover:shadow-xl hover:shadow-red-500 hover:scale-110 duration-300"
                      >
                        <MdDeleteOutline></MdDeleteOutline>
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      )}
    </div>
  );
};

export default BidRequest;
