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
  const handleAupdateJob = (e) => {
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
    <div>
      <Helmet>
        <title>Skill Exchange || Update Job</title>
      </Helmet>
      <div className=" w-[286px] my-10 text-center mx-auto h-[56px] bg-no-repeat flex bg-hero-pattern">
        <h3 className="text-white text-xl ml-[63px]  mt-3  font-bold">
          Previous Job Info
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
                      <p className="ml-[25px] mt-3"> {jobinfo?.jobtitle}</p>
                    </h2>
                    <p className="text-main">
                      Price : ${jobinfo.minPrice} - ${jobinfo.maxPrice}
                    </p>
                    <p className="text-main">Deadline : {jobinfo.deadline}</p>
                    <p className="text-main">{jobinfo.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </span>
          <span className="absolute w-full h-full bg-main -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
          <span className="absolute w-full h-full bg-main -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
        </div>
      </div>
      {/* updating start here */}
      <div>
        <form
          onSubmit={handleAupdateJob}
          className="flex max-w-5xl mx-auto rounded-3xl border-main py-12 flex-col my-12 justify-center border-2 "
        >
          <div className=" w-[286px] mb-20 text-center mx-auto h-[56px] bg-no-repeat flex bg-hero-pattern">
            <h3 className="text-white text-xl ml-[63px]  mt-3  font-bold">
              Updated Job Info
            </h3>
          </div>
          <div className="flex gap-4 justify-center">
            <div className="form-control w-3/12 -mt-10 mb-4">
              <label className="label">
                <span className="label-text text-main">Email</span>
              </label>
              <input
                disabled
                type="email"
                placeholder="email"
                className="input  input-bordered border-main"
                defaultValue={user?.email}
                required
              />
            </div>

            <div className="form-control w-3/12 -mt-10">
              <label className="label">
                <span className="label-text text-main">DeadLine</span>
              </label>
              <input
                name="deadline"
                type="date"
                placeholder="Deadline"
                className="input  input-bordered border-main"
                required
              />
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <input
              className=" input   input-bordered border-main bg-white w-3/12 mb-4"
              type="text"
              name="title"
              placeholder="Job Title"
              id=""
              required
            />
            <select
              required
              onChange={handleCategory}
              className="select  select-bordered w-3/12"
            >
              <option disabled selected>
                Choose A Category?
              </option>
              <option>Web Development</option>
              <option>Digital Marketing</option>
              <option>Graphics Design</option>
            </select>
          </div>
          <div className="flex gap-4 justify-center">
            <input
              className=" input   input-bordered border-main bg-white w-3/12 mb-4"
              type="text"
              name="minPrice"
              id=""
              placeholder="Min Price"
              required
            />
            <input
              className=" input   input-bordered border-main bg-white w-3/12 mb-4"
              type="text"
              name="maxPrice"
              id=""
              placeholder="Max Price"
              required
            />
          </div>
          <textarea
            className="border-2 w-3/4 mx-auto border-main rounded-lg p-2"
            name="description"
            id=""
            cols="5"
            rows="10"
            placeholder="Job Description"
            required
          ></textarea>
          <button
            type="submit"
            className="cursor-pointer my-8 w-3/4 mx-auto rounded-2xl font-semibold overflow-hidden relative z-100 border border-main group px-8 py-2"
          >
            <span className="relative z-10 text-main group-hover:text-white text-xl duration-500">
              Update Job
            </span>
            <span className="absolute w-full h-full bg-main -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
            <span className="absolute w-full h-full bg-main -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
