import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import { Link } from "react-router-dom";
import { IoBookmarkOutline } from "react-icons/io5";
import useAuth from "../../Hook/useAuth";
import toast from "react-hot-toast";
import UseLoading from "../../Hook/useLoading";

const Wd = () => {
  const category = "Web Development";
  const axios = useAxios();
  const getJobs = async () => {
    const response = axios.get(`/jobsBy-category?category=${category}`);
    return response;
  };
  const { data, isLoading, } = useQuery({
    queryKey: ["Jobs", category],
    queryFn: getJobs,
  });
  const { user } = useAuth();
  const handleaddtoBookmark = (post) => {
    const bookmarkData = {
      bookmarkUser: user.email,
      bookmarkPost: post,
    };
    axios.post("/addtobookmark", bookmarkData).then((res) => {
      if (res.data.insertedId) {
        toast.success("Post Added To Bookmark SuccessFully");
      }
    });
  };
  // Handled Post Loading State  From Server
  return isLoading ? (
    <UseLoading></UseLoading>
  ) : (
    // Card Container
    <div className="grid lg:grid-cols-1 xl:grid-cols-2  gap-10 justify-items-center container mx-auto my-12">
      {data?.data?.map((wd) => (
        <div
          key={wd._id}
          className=" lg:w-[600px] w-[90vw]  duration-300 border tracking-wide font-medium shadow-[0_0_40px_#D1D1D1]"
        >
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl text-black font-semibold ">
                {wd?.jobtitle}
              </h2>
              <button
                onClick={() => handleaddtoBookmark(wd)}
                className="p-2  font-bold text-xl"
              >
                <IoBookmarkOutline />
              </button>
            </div>
            <p className="text-black">
              Price : ${wd.minPrice} - ${wd.maxPrice}
            </p>
            <p className="text-black">Deadline : {wd.deadline}</p>
            <p className="text-black">Seller : {wd.sellerEmail}</p>
            <p className="text-black">{wd.description}</p>
            <div className="card-actions justify-end">
              <Link to={`/bidJob/${wd._id}`}>
                <button className="cursor-pointer rounded-full font-semibold overflow-hidden relative z-100 border border-main group px-4">
                  <span className="relative z-10 text-black group-hover:text-white text-lg duration-500">
                    Bid Now
                  </span>
                  <span className="absolute w-full h-full bg-main -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                  <span className="absolute w-full h-full bg-main -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wd;
