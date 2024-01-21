import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";
import useAxios from "../../Hook/useAxios";
import useAuth from "../../Hook/useAuth";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect } from "react";

const UpdateJob = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const jobinfo = useLoaderData();
  const axios = useAxios();
  const { user } = useAuth();
  const [category, setCategory] = useState("");
  const handleCategory = (e) => {
    const category = e.target.value;
    setCategory(category);
  };
  const handleupdateJob = (e) => {
    e.preventDefault();
    const form = e.target;
    const sellerEmail = user?.email || "";
    const jobtitle = form.title.value;
    const minPrice = form.minPrice.value;
    const maxPrice = form.maxPrice.value;
    const description = form.description.value;
    const deadline = form.deadline.value;
    mutate({
      sellerEmail,
      jobtitle,
      minPrice,
      maxPrice,
      description,
      category,
      deadline,
    });
  };
  const { mutate } = useMutation({
    mutationKey: ["addJobs"],
    mutationFn: (newjob) => {
      const post = axios.patch(`/update-job/${jobinfo?._id}`, newjob);
      return post;
    },
    onSuccess: (data) => {
      if (data.data.matchedCount > 0) {
        console.log(data.data);
        return toast.success("Job updated successfully");
      }
    },
    onError: (error) => {
      toast.error("An error occurred while Updating the job", error);
      // Handle the error or display an error message to the user
    },
  });
  return (
    <div className="mt-20">
      <Helmet>
        <title>Skill Exchange || Update Job</title>
      </Helmet>
      {/* Previous Job Info */}
      <div className="flex justify-center items-center flex-col">
        <div className="card w-[600px] card-side bg-base-100 duration-300 border">
          <div className="card-body">
            <h3 className="">Previous Job Info</h3>
            <h2 className="text-xl w-[286px] my-4 text-center mx-auto h-[56px] bg-no-repeat flex  font-semibold ">
              <p className="ml-[25px] mt-3"> {jobinfo?.jobtitle}</p>
            </h2>

            <div className="card md:w-[600px] w-[90vw] mx-auto card-side bg-base-100 duration-300 border">
              <div className="card-body">
                <h3 className="text-2xl font-semibold text-center">
                  Previous Job Info
                </h3>

                <p className=" mt-3"> {jobinfo?.jobtitle}</p>
                <p className="">
                  Price : ${jobinfo.minPrice} - ${jobinfo.maxPrice}
                </p>
                <p className="">Deadline : {jobinfo.deadline}</p>
                <p className="">{jobinfo.description}</p>
              </div>
            </div>
          </div>
          {/* updating start here */}
          <div>
            <form
              onSubmit={handleupdateJob}

              className="flex  mx-auto  py-12 flex-col my-12 justify-center w-1/2 shadow-xl "

              className="flex  mx-auto  rounded-sm py-12 px-12 space-y-6 flex-col my-12 justify-center lg:w-1/2 w-[90vw] shadow-xl "
            >
              <h3 className="text-xl mt-3 text-center font-bold">
                Updated Job Info
              </h3>

              <div className="form-control">
                <label className="label">
                  <span className="label-text ">Email</span>
                </label>
                <input
                  disabled
                  type="email"
                  placeholder="email"

                  className="input  input-bordered"

                  className="input  input-bordered border rounded-sm border-gray-500 focus:border-main focus:outline-none"
                  defaultValue={user?.email}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text ">DeadLine</span>
                </label>
                <input
                  name="deadline"
                  type="date"
                  placeholder="Deadline"

                  className="input input-bordered"

                  className="input input-bordered border rounded-sm border-gray-500 focus:border-main focus:outline-none"
                  required
                />
              </div>
              <input

                className=" input   input-bordered"

                className=" input input-bordered border rounded-sm border-gray-500 focus:border-main focus:outline-none"
                type="text"
                name="title"
                placeholder="Job Title"
                required
              />
              <select
                required
                onChange={handleCategory}

                className="select  select-bordered "

                className="select  select-bordered border rounded-sm border-gray-500 focus:border-main focus:outline-none focus:border-main focus:outline-none "
              >
                <option disabled selected>
                  Choose A Category?
                </option>
                <option>Web Development</option>
                <option>Digital Marketing</option>
                <option>Graphics Design</option>
              </select>
              <input

                className=" input  input-bordered"

                className=" input input-bordered border rounded-sm border-gray-500 focus:border-main focus:outline-none"

                type="text"
                name="minPrice"
                placeholder="Min Price"
                required
              />
              <input

                className=" input input-bordered"

                className=" input input-bordered border rounded-sm border-gray-500 focus:border-main focus:outline-none"

                type="text"
                name="maxPrice"
                placeholder="Max Price"
                required
              />
              <textarea

                className="border-2 w-2/4 mx-auto rounded-lg p-2"

                className="border border-gray-500  focus:border-main focus:outline-none rounded-sm  p-2"

                name="description"
                id=""
                cols="5"
                rows="5"
                placeholder="Job Description"
                required
              ></textarea>
              <button
                type="submit"

                className="cursor-pointer my-8  mx-auto  font-semibold overflow-hidden relative z-100 border group px-8 py-2"

                className="cursor-pointer mx-auto font-semibold   border  px-12 border-gray-500 focus:border-main focus:outline-none   py-2"

              >
                Update Job
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};

export default UpdateJob;