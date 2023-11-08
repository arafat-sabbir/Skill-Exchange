import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import { Link } from "react-router-dom";

const Gd = () => {
  const category = "Graphics Design";
  const axios = useAxios();
  const getJobs = async () => {
    const response = axios.get(`/jobsBy-category?category=${category}`);
    return response;
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Jobs", category],
    queryFn: getJobs,
  });
  return isLoading ? (
    <div className="flex justify-center items-center">
      <div className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]">
        <span className="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"></span>
      </div>
    </div>
  ) : (
    <div className="grid lg:grid-cols-2 gap-4 justify-items-center container mx-auto my-12">
      {data?.data?.map((gd) => (
        <div key={gd._id}>
          <div className="cursor-pointer rounded-2xl font-semibold overflow-hidden relative z-100 border border-main group px-2 py-2">
            <span className="relative z-10 text-main group-hover:text-white text-lg duration-500">
              <div className="card lg:w-[600px] w-[90vw] card-side bg-base-100 duration-300 border border-main hover:shadow-[0_0_40px_#D1D1D1]">
                <div className="card-body">
                  <h2 className="text-2xl font-semibold text-main">
                    {gd?.jobtitle}
                  </h2>
                  <p className="text-main">
                    Price : ${gd.minPrice} - ${gd.maxPrice}
                  </p>
                  <p className="text-main">Deadline : {gd.deadline}</p>
                  <p className="text-main">Seller : {gd.sellerEmail}</p>
                  <p className="text-main">{gd.description}</p>
                  <div className="card-actions justify-end">
                    <Link to={`/bidJob/${gd._id}`}>
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

export default Gd;
