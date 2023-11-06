import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import useAuth from "../../Hook/useAuth";
import PostedJobCard from "./PostedJobCard";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

const MyPostedJob = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    axios.get(`/jobs?email=${user?.email}`).then((res) => setJobs(res?.data));
  }, [axios, user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/delete-jobs/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            toast.success("Deleted Successfully", {
              style: {
                border: "2px solid green",
                padding: "20px",
                color: "#713200",
              },
              iconTheme: {
                primary: "#007456",
                secondary: "#FFFAEE",
              },
            });
            const remaining = jobs.filter((job) => job._id != id);
            setJobs(remaining);
          }
        });
      }
    });
  };
  return (
    <div className=" container mx-auto">
      <Helmet>
        <title>Skill Exchange || Add Jobs</title>
      </Helmet>
      <div className=" w-[286px] my-10 text-center mx-auto h-[56px] bg-no-repeat flex bg-hero-pattern">
        <h3 className="text-white text-2xl ml-[60px]  mt-3  font-bold">
          My Posted Job
        </h3>
      </div>
      <div className="mb-20 grid grid-cols-3 gap-10 justify-items-center">
        {jobs.map((job) => (
          <PostedJobCard
            handleDelete={handleDelete}
            key={job._id}
            job={job}
          ></PostedJobCard>
        ))}
      </div>
    </div>
  );
};

export default MyPostedJob;
