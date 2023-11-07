import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import useAuth from "../../Hook/useAuth";
import PostedJobCard from "./PostedJobCard";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

const MyPostedJob = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const getJobs = async () => {
    const response = axios.get(`/jobs?email=${user?.email}`);
    return response;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["Jobs", user],
    queryFn: getJobs,
  });

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
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            queryClient.invalidateQueries(["Jobs", user]);
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
      <div
        className={
          isLoading
            ? ""
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center my-20"
        }
      >
        {isLoading ? (
       <div className="min-h-[15rem] flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
       <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
         <div className="flex justify-center">
           <div className="animate-spin inline-block w-10 h-10 font-bold  border-[3px] border-current border-t-transparent text-main rounded-full dark:text-main" role="status" aria-label="loading">
             <span className="sr-only">Loading...</span>
           </div>
         </div>
       </div>
     </div>
        ) : (
          data.data.map((job) => (
            <PostedJobCard
              handleDelete={handleDelete}
              key={job._id}
              job={job}
            ></PostedJobCard>
          ))
        )}
      </div>
    </div>
  );
};

export default MyPostedJob;
