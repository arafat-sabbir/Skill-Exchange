import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import { Link } from "react-router-dom";

const Dm = () => {
  const category = "Digital Marketing";
  const axios = useAxios();
  const getJobs = async () => {
    const response = axios.get(`/jobsBy-category?category=${category}`);
    return response;
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Jobs",category],
    queryFn: getJobs,
  });

  // _id
  // 6547c1628f1e523a0bdf8541
  // sellerEmail
  // "arafatshabbir8@gmail.com"
  // jobtitle
  // "Logo Design"
  // minPrice
  // "5000"
  // maxPrice
  // "50000"
  // description
  // "This is A Good Opportunity For Freshman Who Are Looking for their Firs…"
  // category
  // "Graphics Design"
  // deadline
  return (
    <div className="grid grid-cols-2 gap-4 justify-items-center container mx-auto my-12">
    {data?.data?.map((dm) => (
      <div key={dm._id}>
        <div className="cursor-pointer rounded-2xl font-semibold overflow-hidden relative z-100 border border-main group px-2 py-2">
          <span className="relative z-10 text-main group-hover:text-white text-lg duration-500">
          <div className="card w-[600px] card-side bg-base-100 duration-300 border border-main hover:shadow-[0_0_40px_#D1D1D1]">
          <div className="card-body">
            <h2 className="text-2xl font-semibold text-main">
              {dm?.jobtitle}
            </h2>
            <p className="text-main">
              Price : ${dm.minPrice} - ${dm.maxPrice}
            </p>
            <p className="text-main">Deadline : {dm.deadline}</p>
            <p className="text-main">Seller : {dm.sellerEmail}</p>
            <p className="text-main">{dm.description}</p>
            <div className="card-actions justify-end">
              <Link to={`/bidJob/${dm._id}`}>
                <button className="cursor-pointer rounded-2xl font-semibold overflow-hidden relative z-100 border border-main group px-6 py-2">
                  <span className="relative z-10 text-main group-hover:text-white text-lg duration-500">
                    Bid Now
                  </span>
                  <span className="absolute w-full h-full bg-main -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                  <span className="absolute w-full h-full bg-main -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
                </button>
              </Link>
            </div>
          </div>
        </div>
          </span>
          <span className="absolute w-full h-full bg-main -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
          <span className="absolute w-full h-full bg-main -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
        </div>
      </div>
    ))}
  </div>
  );
};

export default Dm;
