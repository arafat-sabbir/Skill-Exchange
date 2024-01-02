import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import { Link } from "react-router-dom";
import { IoBookmarkOutline } from "react-icons/io5";
import useAuth from "../../Hook/useAuth";
import toast from "react-hot-toast";

const Dm = () => {
  const category = "Digital Marketing";
  const axios = useAxios();
  const getJobs = async () => {
    const response = axios.get(`/jobsBy-category?category=${category}`);
    return response;
  };
  const { data, isLoading, isError } = useQuery({
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

  return isLoading ? (
    <div className="flex justify-center items-center">
      <div className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]">
        <span className="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"></span>
      </div>
    </div>
  ) : (
    <div className="grid lg:grid-cols-1 xl:grid-cols-2  gap-10 justify-items-center container mx-auto my-12">
      {data?.data?.map((dm) => (
        <div
          key={dm._id}
          className="card lg:w-[600px] w-[90vw] card-side bg-base-100 duration-300 border tracking-wide font-medium border-main hover:shadow-[0_0_40px_#D1D1D1] shadow-[0_0_40px_#D1D1D1]"
        >
          <div className="card-body">
            <h2 className="text-2xl font-semibold text-black">
              {dm?.jobtitle}
            </h2>
            <p className="text-black">
              Price : ${dm.minPrice} - ${dm.maxPrice}
            </p>
            <p className="text-black">Deadline : {dm.deadline}</p>
            <p className="text-black">Seller : {dm.sellerEmail}</p>
            <p className="text-black">{dm.description}</p>
            <div className="card-actions justify-end">
              <Link to={`/bidJob/${dm._id}`}>
                <button className="cursor-pointer  rounded-full font-semibold overflow-hidden relative z-100 border border-main group px-4">
                  <span className="relative z-10 text-black group-hover:text-white text-lg duration-500">
                    Bid Now
                  </span>
                  <span className="absolute w-full h-full bg-main -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                  <span className="absolute w-full h-full bg-main -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
                </button>
                <button
                  onClick={() => handleaddtoBookmark(dm)}
                  className="p-2  font-bold text-xl"
                >
                  <IoBookmarkOutline />
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dm;
