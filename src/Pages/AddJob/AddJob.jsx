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
  const navigate = useNavigate();
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
        navigate("/myPostedJob");
        return toast.success("Job added successfully");
      }
    },
    onError: (error) => {
      toast.error("An error occurred while adding the job", error);
      // Handle the error or display an error message to the user
    },
  });
  return (
    <div className=" flex flex-col justify-center">
      <Helmet>
        <title>Skill Exchange || Add Jobs</title>
      </Helmet>
      <form
        onSubmit={handleAddJob}
        className="flex lg:w-1/2 w-[90vw] mt-16 space-y-6 mx-auto p-16  flex-col justify-center shadow-2xl"
      >
        <h3 className=" font-semibold text-3xl text-center">Add Job</h3>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-main">Email</span>
          </label>
          <input
            disabled
            type="email"
            placeholder="email"
            className="input  input-bordered border rounded-sm border-gray-500 focus:border-main focus:outline-none"
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
            className="input  input-bordered border rounded-sm border-gray-500 focus:border-main focus:outline-none"
            required
          />
        </div>

        <input
          className="input  input-bordered border rounded-sm border-gray-500 focus:border-main focus:outline-none"
          type="text"
          name="title"
          placeholder="Job Title"
          id=""
          required
        />
        <select
          required
          onChange={handleCategory}
          className="select select-bordered input  border rounded-sm border-gray-500 focus:border-main focus:outline-none"
        >
          <option disabled selected>
            Choose A Category?
          </option>
          <option>Web Development</option>
          <option>Digital Marketing</option>
          <option>Graphics Design</option>
        </select>
        <input
          className="input  input-bordered border rounded-sm border-gray-500 focus:border-main focus:outline-none"
          type="text"
          name="minPrice"
          id=""
          placeholder="Min Price"
          required
        />
        <input
          className="input  input-bordered border rounded-sm border-gray-500 focus:border-main focus:outline-none"
          type="text"
          name="maxPrice"
          id=""
          placeholder="Max Price"
          required
        />
        <textarea
          className="border border-gray-500 focus:border-main focus:outline-none rounded-sm p-2"
          name="description"
          cols="10"
          rows="4"
          placeholder="Job Description"
          required
        ></textarea>
        <button
          type="submit"
          className="cursor-pointer mx-auto font-semibold   border  px-12 border-gray-500 focus:border-main focus:outline-none py-2"
        >
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;
