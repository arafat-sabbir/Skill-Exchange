import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import useAuth from "../../Hook/useAuth";
import PostedJobCard from "./PostedJobCard";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import UseLoading from "../../Hook/useLoading";

const MyPostedJob = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["Jobs", user],
    queryFn: async () => {
      const response = axios.get(`/jobs?email=${user?.email}`);
      return response;
    }
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
      <h3 className=" my-16 font-semibold text-3xl text-center">
        My Posted Job
      </h3>
      <div
        className={
          isLoading
            ? ""
            : "grid grid-cols-1 lg:grid-cols-3 gap-10 justify-items-center my-20"
        }
      >
        {isLoading ? (
          <UseLoading></UseLoading>
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
