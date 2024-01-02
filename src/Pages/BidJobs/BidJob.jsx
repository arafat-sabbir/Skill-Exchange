import { Helmet } from "react-helmet";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import useAxios from "../../Hook/useAxios";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useState } from "react";

const BidJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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
        navigate("/myBids");
        toast.success("SuccessFully Bidded Job");
      }
    },
    onError: (error) => {
      toast.error("An error occurred while adding the job", error);
      // Handle the error or display an error message to the user
    },
  });
  const [isButtonDisabled, setisButtonDisabled] = useState(false);

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
    const bidded = "1";

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

  const DeadlineDate = new Date(JobDetail?.deadline);
  const unixtoday = new Date(Date.now());
  const daydifferent = Math.floor(
    (DeadlineDate - unixtoday) / (1000 * 60 * 60 * 24)
  );

  useEffect(() => {
    if (user?.email === JobDetail?.sellerEmail) {
      setisButtonDisabled(true);
    } else if (daydifferent < 1) {
      setisButtonDisabled(true);
    }
  }, [JobDetail.sellerEmail, user?.email, daydifferent]);
  const { data: review,refetch } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const res = await axios.get(`/review/${JobDetail._id}`);
      return res.data;
    },
  });
  console.log(review);
  const reviewref = useRef();
  const handleSubmitReview = (id) => {
    const review = reviewref.current.value;
    if(!review){
     return toast.error("Review Can't Be Empty")
    }
    reviewref.current.value=""
    const tid = toast.loading("Submitting Review")
    const reviewDetail = {
      ReviewerName: user.displayName,
      ReviewerEmail: user.email,
      Review: review,
      postid:id
    };
    axios.post('/addReview',reviewDetail)
    .then(res=> {
      if(res.data.insertedId){
        toast.success("Review Submitted Successfully",{id:tid})
        refetch()
      }
    })
  };
  return (
    <div className="container mx-auto">
      <Helmet>
        <title>Skill Exchange || {JobDetail.jobtitle}</title>
      </Helmet>
      <h3 className="my-10 font-semibold text-3xl text-center">
        Job Detail | Bid
      </h3>
      <div className="flex justify-center items-center">
        <div className="grid  justify-items-center container mx-auto my-2">
          <div>
            <div className="card w-[90vw] lg:w-[600px] card-side bg-base-100 duration-300 border-2 shadow-[0_0_10px_] border-main ">
              <div className="card-body">
                <p className="my-4 font-semibold text-3xl text-center">
                  {" "}
                  {JobDetail?.jobtitle}
                </p>
                <p className="text-black">
                  <span className="text-lg font-semibold">Price :</span> $
                  {JobDetail.minPrice} - ${JobDetail.maxPrice}
                </p>
                <p className="text-black">
                  {" "}
                  <span className="text-lg font-semibold">Deadline :</span>{" "}
                  {JobDetail.deadline}
                </p>
                <p className="text-black">{JobDetail.description}</p>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button
                  className="text-black text-center border-2 p-1 rounded-full border-main font-semibold w-[100px] ml-auto "
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  Review job
                </button>
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box pt-14">
                    <textarea
                      ref={reviewref}
                      className="border-2 border-main flex p-4  justify-center ml-8 rounded-xl"
                      name="text-area"
                      id=""
                      cols="40"
                      rows="6"
                      placeholder="Your Review"
                    ></textarea>
                    <div className="modal-action">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button>Cancel</button>
                        <button
                          onClick={() => handleSubmitReview(JobDetail._id)}
                          className="ml-4"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bidding Form Start */}
      <div className="border shadow-[5px_5px_10px_] border-main mx-auto lg:max-w-4xl w-[90vw] my-10 rounded-3xl">
        <div className="w-[286px] my-10   text-center mx-auto h-[56px] bg-no-repeat flex ">
          <h3 className="font-semibold text-3xl text-center ml-14 text-main">
            Bidding Info
          </h3>
        </div>
        <div>
          <form
            onSubmit={handleBid}
            className="lg:w-1/2  w-[90%] mx-auto mb-20"
          >
            <div className="md:flex gap-4">
              <div className="form-control lg:w-full">
                <label className="label">
                  <span className="label-text">Your Email</span>
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
                    : " rounded-2xl text-black font-semibold overflow-hidden relative z-100 border border-main group px-6 py-2"
                }
              >
                <p className="text-red-500 font-semibold">
                  {daydifferent < 1 ? "Can't Bid Deadline Is Over" : ""}
                </p>
                <p className="text-red-500 font-semibold">
                  {user?.email === JobDetail?.sellerEmail
                    ? "You Cant Bid Your Own Job"
                    : ""}
                </p>
                <span className="relative z-10  text-black group-hover:text-white text-lg duration-500">
                  Bid on The Project
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
       <div>
        <h3 className="text-3xl font-semibold text-center  my-10">Client Review On This Post</h3>
     {
      review? <div className="grid grid-cols-1 md:grid-cols-2 mb-10 lg:grid-cols-3 gap-10 justify-items-center">
      {review?.map((item) => (
          <div
            key={item._id}
            className="card shadow-[0_0_10px] lg:w-96 w-[90vw] font-medium tracking-wide card-side bg-base-100 duration-300 border-2 border-main hover:shadow-[0_0_40px_#D1D1D1]"
          >
            <div className="card-body">
              
              <p className="text-black">
                Reviewer : {item.ReviewerName}
              </p>
              <p className="text-black text-sm">Reviewer Email : {item.ReviewerEmail}</p>
              <p>{item.Review}</p>
            </div>
          </div>
        ))}
      </div>: <div className="flex flex-col justify-items-center  h-[20vh] my-10 justify-center items-center w-[80vw]">
          <img
            className="mx-auto"
            src="https://i.ibb.co/PFzsmpn/icons8-404-restricted-web-page-on-internet-browser-layout-100.png"
            alt=""
          />
          <h3 className="text-3xl font-semibold text-center text-red-500">NoOne Reviewed This Job</h3>
        </div> 
     }
       </div>
    </div>
  );
};

export default BidJob;
