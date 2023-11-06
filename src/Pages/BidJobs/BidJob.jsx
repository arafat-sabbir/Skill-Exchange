import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import useAxios from "../../Hook/useAxios";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

const BidJob = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const JobDetail = useLoaderData();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const { mutate } = useMutation({
    mutationKey: ["addJobs"],
    mutationFn: (newbids) => {
      const post = axios.post("/add-bids", newbids);
      return post;
    },
    onSuccess: (data) => {
      if (data.data.acknowledged) {
        toast.success("SuccessFully Bidded Job");
      }
    },
    onError: (error) => {
      toast.error("An error occurred while adding the job", error);
      // Handle the error or display an error message to the user
    },
  });

  const handleBid = (e) => {
    e.preventDefault();
    const form = e.target;
    const bidderEmail = user?.email;
    const biddingStatus = "Pending";
    const biddingPrice = form.biddingAmount.value;
    const biddingdeadline = form.deadline.value;
    const jobtitle = JobDetail?.jobtitle;
    const sellerEmail = JobDetail?.sellerEmail;
    const deadline = JobDetail?.deadline;
    const bidded = '1'

    // Use the 'mutate' function to send the data to the server
    mutate({
      bidderEmail,
      biddingStatus,
      biddingPrice,
      biddingdeadline,
      jobtitle,
      sellerEmail,
      deadline,
      bidded,
    });
  };

  const isButtonDisabled = user?.email === JobDetail?.sellerEmail;

  return (
    <div className="container mx-auto">
      <Helmet>
        <title>Skill Exchange || {JobDetail.jobtitle}</title>
      </Helmet>
      <div className="w-[286px] my-10 text-center mx-auto h-[56px] bg-no-repeat flex bg-hero-pattern">
        <h3 className="text-white text-xl ml-[75px]  mt-3  font-bold">
          Job Detail | Bid
        </h3>
      </div>
      <div className="flex justify-center items-center">
        <div className=" rounded-2xl font-semibold overflow-hidden relative z-100 border border-main group px-6 py-2">
          <span className="relative z-10 text-main group-hover:text-white text-lg duration-500">
            <div className="grid  justify-items-center container mx-auto my-12">
              <div>
                <div className="card w-[600px] card-side bg-base-100 duration-300 border border-main hover:shadow-[0_0_20px_#FAF6EB]">
                  <div className="card-body">
                    <h2 className="text-xl w-[286px] my-4 text-center mx-auto h-[56px] bg-no-repeat flex bg-hero-pattern font-semibold text-white">
                      <p className="ml-[25px] mt-3"> {JobDetail?.jobtitle}</p>
                    </h2>
                    <p className="text-main">
                      Price : ${JobDetail.minPrice} - ${JobDetail.maxPrice}
                    </p>
                    <p className="text-main">Deadline : {JobDetail.deadline}</p>
                    <p className="text-main">{JobDetail.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </span>
          <span className="absolute w-full h-full bg-main -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
          <span className="absolute w-full h-full bg-main -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
        </div>
      </div>
      {/* Bidding Form Start */}
      <div className="border border-main my-10 rounded-3xl">
        <div className="w-[286px] my-10   text-center mx-auto h-[56px] bg-no-repeat flex bg-hero-pattern">
          <h3 className="text-white text-xl ml-[95px]  mt-3  font-bold">
            Bidding Info
          </h3>
        </div>
        <div>
          <form onSubmit={handleBid} className="w-1/2 mx-auto mb-20">
            <div className="md:flex gap-4">
              <div className="form-control lg:w-full">
                <label className="label">
                  <span className="label-text">your Email</span>
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="your email"
                  className="input bg-transparent border border-main"
                  required
                  defaultValue={user?.email}
                  disabled
                />
              </div>
              <div className="form-control md:w-full">
                <label className="label">
                  <span className="label-text">Seller Email</span>
                </label>
                <input
                  type="text"
                  name="sellerEmail"
                  className="input bg-transparent border border-main"
                  required
                  defaultValue={JobDetail.sellerEmail}
                  disabled
                />
              </div>
            </div>
            <div className="md:flex gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Bidding Amount</span>
                </label>
                <input
                  type="text"
                  name="biddingAmount"
                  placeholder="bidding amount"
                  className="input bg-transparent border border-main"
                  required
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Deadline</span>
                </label>
                <div className="form-control relative">
                  <input
                    type="date"
                    name="deadline"
                    className="input bg-transparent border border-main"
                    required
                  />

                  <div className="my-1 text-red-400 font-medium"></div>
                  <span className="absolute top-4 right-2"></span>
                </div>
              </div>
            </div>
            <div className="form-control mt-6">
              <button
                disabled={isButtonDisabled}
                type="submit"
                className={
                  isButtonDisabled
                    ? "cursor-none bg-gray-100 px-6 py-2 rounded-2xl  "
                    : " rounded-2xl text-main font-semibold overflow-hidden relative z-100 border border-main group px-6 py-2"
                }
              >
                <span className="relative z-10  text-main group-hover:text-white text-lg duration-500">
                  Bid Now
                </span>
                {isButtonDisabled ? (
                  ""
                ) : (
                  <div>
                    <span className="absolute w-full h-full bg-main -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                    <span className="absolute w-full h-full bg-main -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BidJob;
