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
    <div>
      <Helmet>
        <title>Skill Exchange || Add Jobs</title>
      </Helmet>
      <div className=" w-[286px] my-10 text-center mx-auto h-[56px] bg-no-repeat flex bg-hero-pattern">
        <h3 className="text-white text-2xl ml-[100px]  mt-3  font-bold">
          Add Job
        </h3>
      </div>
      <form
        onSubmit={handleAddJob}
        className="flex container lg:w-auto w-[90vw] mx-auto bg-[#F3F3F3] rounded-xl duration-500 hover:shadow-[0_0_10px_#007456] lg:py-36 py-20 flex-col my-12 justify-center border-2 lg:px-12"
      >
        <div className="flex lg:flex-row flex-col w-[90%] lg:w-9/12 lg:gap-4  mx-auto lg:justify-center">
          <div className="form-control lg:w-[50%]  -mt-10 lg:mb-4 mb-10 mx-auto w-full ">
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

          <div className="form-control lg:w-[50%] mx-auto w-full -mt-10">
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
        <div className="flex lg:flex-row flex-col w-[90%] lg:w-9/12 lg:gap-4  mx-auto lg:justify-center">
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
        <div className="flex lg:flex-row flex-col w-[90%] lg:w-9/12 lg:gap-4  mx-auto lg:justify-center">
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
          className="border lg:w-9/12 w-[90%] mx-auto border-main rounded-lg p-2"
          name="description"
          id=""
          cols="10"
          rows="10"
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
