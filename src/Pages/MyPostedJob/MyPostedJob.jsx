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
        <title>Skill Exchange || My Posted Job</title>
      </Helmet>
      <div className=" w-[286px] my-10 text-center mx-auto h-[56px] bg-no-repeat flex ">
        <h3 className="text-white text-2xl ml-[60px]  mt-3  font-bold">
          My Posted Job
        </h3>
      </div>
      <div
        className={
          isLoading
            ? ""
            : "grid grid-cols-1 lg:grid-cols-3 gap-10 justify-items-center my-20"
        }
      >
        {isLoading ? (
      <div className="flex justify-center items-center">
      <div className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]">
        <span className="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"></span>
      </div>
    </div>
        ) : (
          data?.data?.map((job) => (
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
