import { Helmet } from "react-helmet";
import useAuth from "../../Hook/useAuth";
import { useState } from "react";
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
    const jobData ={
      sellerEmail : user?.email || "",
      sellerName:user.displayName,
      sellerPhoto:user.photoURL,
      jobtitle :form.title.value,
       minPrice : form.minPrice.value,
       maxPrice : form.maxPrice.value,
       description : form.description.value,
       deadline : form.deadline.value,
       category,
    }
    axios.post("/add-jobs", jobData)
    .then(data=>{
      if (data.data.acknowledged) {
        navigate('/dashboard/myPostedJob')
        return toast.success("Job added successfully");
      }
    })
    .catch((error)=>{
      toast.error(error)
    })

  };
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
            className="input rounded-sm bg-transparent text-black border border-gray-500 focus:ring-0 focus:outline-none focus:border-main"
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
            className="input rounded-sm bg-transparent text-black border border-gray-500 focus:ring-0 focus:outline-none focus:border-main"
            required
          />
        </div>
        <div className="flex  gap-3 ">
          <input
            className="input rounded-sm bg-transparent text-black border border-gray-500 focus:ring-0 focus:outline-none focus:border-main w-[50%]"
            type="text"
            name="title"
            placeholder="Job Title"
            id=""
            required
          />
          <select
            required
            onChange={handleCategory}
            className="select border-gray-500 focus:border-main w-full rounded-sm  select-bordered lg:w-[50%] mb-4 lg:mb-auto"
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
            className="input rounded-sm bg-transparent text-black border border-gray-500 focus:ring-0 focus:outline-none focus:border-main w-[50%]"
            type="text"
            name="minPrice"
            id=""
            placeholder="Min Price"
            required
          />
          <input
            className="input rounded-sm bg-transparent text-black border border-gray-500 focus:ring-0 focus:outline-none focus:border-main w-[50%]"
            type="text"
            name="maxPrice"
            id=""
            placeholder="Max Price"
            required
          />
        </div>
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
