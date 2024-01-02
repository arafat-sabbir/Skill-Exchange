import useAxios from "../../Hook/useAxios";
import useAuth from "../../Hook/useAuth";
import { Helmet } from "react-helmet";
import { MdDeleteOutline } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";

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
    axios.patch(`/update-status/${id}`, { status: "In Progress" }).then((res) => {
      queryClient.invalidateQueries(["Jobs", user]);
    });
  };
  const handleRejectBid = (id) => {
    axios
      .patch(`/reject-status/${id}`, { status: "Canceled" })
      .then((res) => {
        console.log(res.data);
        queryClient.invalidateQueries(["Jobs", user]);
      });
  };

  return (
    <div className="container mx-auto">
      <Helmet>
        <title>Skill Exchange || Bid Requests</title>
      </Helmet>
        <h3 className="my-16 font-semibold text-3xl text-center">
          Bid Request
        </h3>
      {isLoading ? (
        <div className="flex justify-center items-center">
        <div className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]">
          <span className="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"></span>
        </div>
      </div>
      ) : (
        <div className="flex flex-col mb-52">
          <div className="-m-1.5 overflow-x-auto  ">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="border overflow-hidden  rounded-xl">
                <table className="min-w-full divide-y divide-gray-200 ">
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
                  <tbody className="divide-y divide-gray-200 ">
                    {data?.data.map((MyBids) => (
                      <tr key={MyBids?._id}>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold text-sm text-gray-800 ">
                          {MyBids.jobtitle}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold text-sm text-gray-800 ">
                          {MyBids?.bidderEmail}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold ">
                          {MyBids?.biddingdeadline}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-main font-semibold ">
                          ${MyBids?.biddingPrice}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800 ">
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
                                  MyBids.biddingStatus === "Completed"
                                    ? 100
                                    : 50
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BidRequest;
