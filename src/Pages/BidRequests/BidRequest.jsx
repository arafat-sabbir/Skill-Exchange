import useAxios from "../../Hook/useAxios";
import useAuth from "../../Hook/useAuth";
import { Helmet } from "react-helmet";
import { MdDeleteOutline } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import { useState } from "react";

const BidRequest = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const [status, setStatus] = useState("");
  const queryClient = useQueryClient();
  const userEmail = user?.email;
  const getJobs = async () => {
    const response = axios.get(`/getbidreq?bidded=1&sellerEmail=${userEmail}`);
    return response;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["Jobs", user, status],
    queryFn: getJobs,
  });
  const handleAcceptBid = (id) => {
    axios.patch(`/update-status/${id}`, { status: "Progress" }).then((res) => {
      queryClient.invalidateQueries(["Jobs", user]);
      setStatus(data?.data.biddingStatus);
    });
  };
  const handleRejectBid = (id) => {
    axios.patch(`/reject-status/${id}`, { status: "Rejected" }).then((res) => {
      queryClient.invalidateQueries(["Jobs", user]);
      setStatus(data?.data.biddingStatus);
    });
  };
  
  return (
    <div className="container mx-auto">
      <Helmet>
        <title>Skill Exchange || Bid Requests</title>
      </Helmet>
      <div className=" w-[286px] my-20 text-center mx-auto h-[56px] bg-no-repeat flex bg-hero-pattern">
        <h3 className="text-white text-2xl ml-[85px]  mt-3  font-bold">
          Bid Request
        </h3>
      </div>
      {isLoading ? (
        <div className="min-h-[15rem] flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
            <div className="flex justify-center">
              <div
                className="animate-spin inline-block w-10 h-10 font-bold  border-[3px] border-current border-t-transparent text-main rounded-full dark:text-main"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col mb-52">
          <div className="-m-1.5 overflow-x-auto  ">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="border overflow-hidden dark:border-gray-700 rounded-xl">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                        Job Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase"
                      >
                        Bidder Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase"
                      >
                        DeadLine
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase"
                      >
                        Bidded Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {data?.data.map((MyBids) => (
                      <tr key={MyBids?._id}>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold text-sm text-gray-800 dark:text-gray-200">
                          {MyBids.jobtitle}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold text-sm text-gray-800 dark:text-gray-200">
                          {MyBids?.bidderEmail}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold dark:text-gray-200">
                          {MyBids?.biddingdeadline}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-main font-semibold dark:text-gray-200">
                          ${MyBids?.biddingPrice}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800 dark:text-gray-200">
                          {MyBids?.biddingStatus}
                        </td>
                        {MyBids.biddingStatus === "Rejected" ? (
                          <h3 className="flex my-4 items-center ">
                            <FcCancel></FcCancel>Bid Rejected
                          </h3>
                        ) : MyBids.biddingStatus === "Progress" ||
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
                          <td>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BidRequest;
