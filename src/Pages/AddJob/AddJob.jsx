import { Helmet } from "react-helmet";
import useAuth from "../../Hook/useAuth";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate()
  const [category, setCategory] = useState("");
  const handleCategory = (e) => {
    const category = e.target.value;
    setCategory(category);
  };
  const handleAddJob = (e) => {
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
      const post = axios.post("/add-jobs", newjob);
      return post;
    },
    onSuccess: (data) => {
      if (data.data.acknowledged) {
        navigate('/myPostedJob')
        return toast.success("Job added successfully");

      }
    },
    onError: (error) => {
      toast.error("An error occurred while adding the job", error);
      // Handle the error or display an error message to the user
    },
  });
  return (
    <div className="h-screen flex flex-col justify-center">
      <Helmet>
        <title>Skill Exchange || Add Jobs</title>
      </Helmet>
      <form
        onSubmit={handleAddJob}
        className="flex w-1/2 mx-auto p-16  flex-col justify-center shadow-2xl"
      >
        <h3 className=" font-semibold text-3xl text-center">
          Add Job
        </h3>
        <div className="flex gap-3 my-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-main">Email</span>
            </label>
            <input
              disabled
              type="email"
              placeholder="email"
              className="input input-bordered border-main"
              defaultValue={user?.email}
              required
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-main">DeadLine</span>
            </label>
            <input
              name="deadline"
              type="date"
              placeholder="Deadline"
              className="input input-bordered border-main"
              required
            />
          </div>
        </div>
        <div className="flex  gap-3 ">
          <input
            className=" input mx-auto input-bordered border-main bg-white w-full lg:w-[50%] lg:mb-4 my-6 lg:my-auto "
            type="text"
            name="title"
            placeholder="Job Title"
            id=""
            required
          />
          <select
            required
            onChange={handleCategory}
            className="select border-main w-full  select-bordered lg:w-[50%] mb-4 lg:mb-auto"
          >
            <option disabled selected>
              Choose A Category?
            </option>
            <option>Web Development</option>
            <option>Digital Marketing</option>
            <option>Graphics Design</option>
          </select>
        </div>
        <div className="flex  gap-3 ">
          <input
            className=" input  input-bordered border-main bg-white lg:w-[50%] mb-4"
            type="text"
            name="minPrice"
            id=""
            placeholder="Min Price"
            required
          />
          <input
            className=" input  input-bordered border-main bg-white lg:w-[50%] mb-4"
            type="text"
            name="maxPrice"
            id=""
            placeholder="Max Price"
            required
          />
        </div>
        <textarea
          className="border rounded-xl p-4"
          name="description"
          id=""
          cols="10"
          rows="6"
          placeholder="Job Description"
          required
        ></textarea>
        <button
          type="submit"
          className="cursor-pointer my-8 lg:mb-auto lg:w-9/12 w-[90%] mx-auto rounded-2xl font-semibold overflow-hidden relative z-100 border border-main group px-8 py-2"
        >
          <span className="relative z-10 text-main group-hover:text-white text-xl duration-500">
            Add Job
          </span>
          <span className="absolute w-full h-full bg-main -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
          <span className="absolute w-full h-full bg-main -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
        </button>
      </form>
    </div>
  );
};

export default AddJob;
