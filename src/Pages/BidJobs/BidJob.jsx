import { Helmet } from "react-helmet";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import useAxios from "../../Hook/useAxios";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useState } from "react";
import JobDetailPage from "./JobDetailPage";
import BidJobForm from "../../Utility/Forms/BidJobForm";

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
        navigate("/dashboard/myBids");
        toast.success("SuccessFully Bided Job");
      }
    },
    onError: (error) => {
      toast.error("An error occurred while adding the job", error);
      // Handle the error or display an error message to the user
    },
  });
  const [isButtonDisabled, setButtonDisabled] = useState(false);

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
    // Check The Day Difference Between Deadline And Today
    const DeadlineDate = new Date(JobDetail?.deadline);
    const unixToday = new Date(Date.now());
    const dayDifferent = Math.floor(
      (DeadlineDate - unixToday) / (1000 * 60 * 60 * 24)
    );
    // Validate Deadline And Post Author
    if (dayDifferent < 1) {
      return toast.error("Can't Bid Job Deadline Is Over")
    } else if (user?.email === JobDetail?.sellerEmail) {
      return toast.error("You Can't Bid Your Own Job")
    }

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

  const { data: review, refetch } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const res = await axios.get(`/review/${JobDetail._id}`);
      return res.data;
    },
  });
  // Review TextArea Ref
  const reviewRef = useRef();
  // Submit Review Function
  const handleSubmitReview = (id) => {
    const review = reviewRef.current.value;
    if (!review) {
      return toast.error("Review Can't Be Empty");
    }
    reviewRef.current.value = "";
    const tid = toast.loading("Submitting Review");
    const reviewDetail = {
      ReviewerName: user.displayName,
      ReviewerEmail: user.email,
      Review: review,
      postid: id,
    };
    axios.post("/addReview", reviewDetail).then((res) => {
      if (res.data.insertedId) {
        toast.success("Review Submitted Successfully", { id: tid });
        refetch();
      }
    });
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
          {/* Previous Job Detail */}
          <JobDetailPage JobDetail={JobDetail} handleSubmitReview={handleSubmitReview} reviewRef={reviewRef}></JobDetailPage>
          {/* Previous job detail end */}
        </div>
      </div>
      {/* Bidding Form Start */}
      <div>
        <BidJobForm handleBid={handleBid} isButtonDisabled={isButtonDisabled} user={user} JobDetail={JobDetail} ></BidJobForm>
        {/* Bidding End */}
      </div>
      <div>
        <h3 className="text-3xl font-semibold text-center  my-10">
          Freelancer Review On This Client
        </h3>
        {review ? (
          <div className="grid grid-cols-1 md:grid-cols-2 mb-10 lg:grid-cols-3 gap-10 justify-items-center">
            {review?.map((item) => (
              <div
                key={item._id}
                className="card shadow-[0_0_10px] lg:w-96 w-[90vw] font-medium tracking-wide card-side bg-base-100 duration-300 border-2 border-main hover:shadow-[0_0_40px_#D1D1D1]"
              >
                <div className="card-body">
                  <p className="text-black">Reviewer : {item.ReviewerName}</p>
                  <p className="text-black text-sm">
                    Reviewer Email : {item.ReviewerEmail}
                  </p>
                  <p>{item.Review}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-items-center  h-[20vh] my-10 justify-center items-center w-[80vw]">
            <img
              className="mx-auto"
              src="https://i.ibb.co/PFzsmpn/icons8-404-restricted-web-page-on-internet-browser-layout-100.png"
              alt=""
            />
            <h3 className="text-3xl font-semibold text-center text-red-500">
              NoOne Reviewed This Job
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default BidJob;
